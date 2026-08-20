import { test } from '@playwright/test';

export function step<T>(_stepName?: string) {
    return function (target: (...args: any[]) => Promise<T>, context: ClassMethodDecoratorContext) {
        return function (this: any, ...args: any[]): Promise<T> {
            const isStatic = typeof this === 'function';
            const className = isStatic ? this.name : getOriginalClass(this, context.name.toString());
            const methodDetails = `${className}.${context.name.toString()}`;

            const { paramNames, defaultValues } = extractFunctionParamNames(target);

            const name = _stepName
                ? `${replacePlaceholders(_stepName, args, paramNames, defaultValues)} - ${methodDetails}`
                : methodDetails;

            const error = new Error('Capturing stack trace');
            const stackLines = error.stack?.split('\n') || [];
            const stack = stackLines.find(line => line.includes('.ts:') && !line.includes('step-decorator.ts'));
            const filePath = stack?.match(/tests\/(.+)/);
            const finalPath = filePath ? `.../${filePath[1]}` : null;

            const stepNameWithStack = `${name} — ${finalPath}`;

            return test.step(stepNameWithStack, async () => {
                return await target.call(this, ...args) as T;
            });
        };
    };
}

function getOriginalClass(instance: any, methodName: string) {
    if (!instance) return 'UnknownClass';
    if (instance.constructor && instance.constructor.name && instance.constructor.name !== 'Object') {
        return instance.constructor.name;
    }

    let proto = Object.getPrototypeOf(instance);
    while (proto && proto !== Object.prototype) {
        if (Object.prototype.hasOwnProperty.call(proto, methodName) || Object.getOwnPropertyDescriptor(proto, methodName)) {
            return proto.constructor?.name || 'UnknownClass';
        }
        proto = Object.getPrototypeOf(proto);
    }

    return 'UnknownClass';
}

function extractFunctionParamNames(fn: Function) {
    const fnStr = fn.toString();
    const paramsMatch = fnStr.match(/^[^(]*\(([^)]*)\)/m) || fnStr.match(/^[^=]*=>/m);
    const paramsSection = paramsMatch ? paramsMatch[1] || '' : '';
    const rawParams = paramsSection.split(',').map(p => p.trim()).filter(Boolean);

    const paramNames: string[] = [];
    const defaultValues: Record<string, any> = {};

    for (const raw of rawParams) {
        // handle patterns like "param = 'default'" or "param=42"
        const [left, ...rest] = raw.split('=');
        const name = left.replace(/\/\*.*?\*\//g, '').trim();
        paramNames.push(name);
        if (rest.length) {
            const def = rest.join('=').trim();
            try {
                // Try to evaluate primitive defaults safely
                // eslint-disable-next-line no-eval
                defaultValues[name] = eval(def);
            } catch {
                defaultValues[name] = def;
            }
        }
    }

    return { paramNames, defaultValues };
}

function replacePlaceholders(template: string, args: any[], paramNames: string[], defaultValues: Record<string, any>) {
    return template.replace(/\{([^}]+)\}/g, (_m, key) => {
            const index = /^\d+$/.test(key) ? parseInt(key, 10) : -1;
        if (index >= 0) {
            return String(args[index] ?? '');
        }

        const paramIndex = paramNames.indexOf(key);
        if (paramIndex >= 0) {
            return String(args[paramIndex] ?? defaultValues[key] ?? '');
        }

        return '';
    });
}
