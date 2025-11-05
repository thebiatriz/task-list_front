import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { handleApiError } from "../../utils/error-handler.util";
import { getStoredToken } from "../../utils/auth.storage";

function apiConfig(baseUrl: string): AxiosRequestConfig {
    return {
        baseURL: baseUrl,
    };
}

function initAxios(config: AxiosRequestConfig, token?: string): AxiosInstance {
    const defineInstance = axios.create(config);
    defineInstance.interceptors.request.use(
        (request) => {
            request.headers.Authorization = token ?? `Bearer ${getStoredToken()}`;
            return request;
        },
        (error) => Promise.reject(error)
    );

    defineInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            handleApiError(error);
            return Promise.reject(error);
        }
    );

    return defineInstance;
}

function api(baseURL = import.meta.env.VITE_APP_BASE_URL, token?: string) {
    return initAxios(apiConfig(baseURL), token);
}

export default api;