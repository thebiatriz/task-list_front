import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { handleApiError } from "../../utils/error-handler.util";

function apiConfig(baseUrl: string): AxiosRequestConfig {
    return {
        baseURL: baseUrl,
    };
}

function initAxios(config: AxiosRequestConfig): AxiosInstance {
    const defineInstance = axios.create(config);
    defineInstance.interceptors.request.use(
        (request) => {
            return request;
        },
        (error) => Promise.reject(error)
    );

    defineInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => handleApiError(error)
    );

    return defineInstance;
}

function api(baseURL = import.meta.env.VITE_APP_BASE_URL) {
    return initAxios(apiConfig(baseURL));
}

export default api;