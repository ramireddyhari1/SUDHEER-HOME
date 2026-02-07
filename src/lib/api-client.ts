

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
    method?: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
}

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    [key: string]: any;
}

export const apiClient = {
    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = "GET", body, headers = {}, cache = "no-store" } = options;

        const config: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            cache,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(endpoint, config);
            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                result = { success: response.ok, message: response.statusText };
            }

            if (!response.ok) {
                const errorMessage = result.message || "Something went wrong";
                console.error(`API Error ${response.url}:`, errorMessage);
                // Optionally trigger a toast here if configured
                throw new Error(errorMessage);
            }

            return result as T;
        } catch (error: any) {
            console.error("Network/Client Error:", error);
            throw error;
        }
    },

    get<T>(endpoint: string, cache: RequestCache = "no-store") {
        return this.request<T>(endpoint, { method: "GET", cache });
    },

    post<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, { method: "POST", body });
    },

    put<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, { method: "PUT", body });
    },

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
};
