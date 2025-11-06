import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { handleApiError } from "../../utils/error-handler.util";
import { getStoredToken } from "../../utils/auth.storage";

function apiConfig(baseUrl: string): AxiosRequestConfig {
    return {
        baseURL: baseUrl,
    };
}

function initAxios(config: AxiosRequestConfig): AxiosInstance {
    const defineInstance = axios.create(config);

    defineInstance.interceptors.request.use(
        (request) => {
            const token = getStoredToken();
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
            }
            return request;
        },
        (error) => Promise.reject(error)
    );

    defineInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            const status = error.response?.status;
            const currentPath = window.location.pathname;

            if (status === 401 && currentPath === '/login') {
                return Promise.reject(error);
            }

            handleApiError(error);
            return Promise.reject(error);
        }
    );

    return defineInstance;
}

function api(baseURL = import.meta.env.VITE_APP_BASE_URL) {
    return initAxios(apiConfig(baseURL));
}

export default api;