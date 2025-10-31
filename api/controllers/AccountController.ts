import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export default class AccountController {

    request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async deleteUser(email: string, sid: string) {
        const response = await this.request.delete('/api/users', {
            data: { email: email },
            headers: { 'Cookie': sid }
        });
        return response;
    }

    async registerUser(email: string, password: string, name: string, lastName: string) {
        const response = await this.request.post('/api/auth/signup', {
            data: {
                name,
                lastName,
                email,
                password,
                repeatPassword: password
            }
        });
        return response;
    }

    async signIn(email: string, password: string) {
        let sid: string;
        const response = await this.request.post('/api/auth/signin', {
            data: {
                "email": email,
                "password": password,
                "remember": false
            }
        });

        expect(response.status()).toBe(200);
        const headers = response.headers();
        const setCookieHeader = headers['set-cookie'];

        sid = setCookieHeader?.split(';')[0];
        expect(sid).toContain('sid=');
        return sid;
    }
}