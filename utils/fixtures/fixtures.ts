import { mergeTests } from '@playwright/test';
import { test as pomFixture } from './pom';
import { test as screenSizesFixture } from './screenSizes';

export const test = mergeTests(pomFixture, screenSizesFixture);
export { expect } from '@playwright/test';