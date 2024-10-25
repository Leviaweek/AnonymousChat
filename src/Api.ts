import { User } from "@interfaces/User";

export class Api
{
    static url = "https://localhost:7171";

    static async requestAsync(endpoint: string, body: object | null, method: RequestMethod)
    {
        const response = await fetch(`${this.url}/${endpoint}`, {
            body: body == null ? null : JSON.stringify(body),
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 

        });
        return response;
    }

    static async loginAsync(login: string, password: string): Promise<User | null>
    {
        try{
            const response = await this.requestAsync("user/login", { login: login, password: password }, "POST")

            if (!response.ok)
            {
                return null;
            }
            const obj: User = await response.json();

            return obj;
        }
        catch
        {
            return null;
        }
    }

    static async registerAsync(login: string, password: string): Promise<User | null>
    {
        try{
            const response = await this.requestAsync("user/register", { login: login, password: password }, "POST")

            if (!response.ok)
            {
                return null;
            }

            const obj: User = await response.json();

            return obj;
        }
        catch
        {
            return null;
        }
    }
    static async refreshAccessTokenAsync(): Promise<User | null> {
        try
        {
            const response = await this.requestAsync("user/refresh-access-token", null, 'POST')
            const obj: User = await response.json();
            return obj;
        }
        catch
        {
            return null;
        }
    }
}

type RequestMethod = "GET" | "POST" | "DELETE";