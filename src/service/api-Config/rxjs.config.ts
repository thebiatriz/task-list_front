import type { ResponseType } from "axios";
import { Observable, defer, map } from "rxjs";
import api from "./setup";

const get = <T>(
    url: string,
    params?: object,
    baseURL?: string,
    responseType: ResponseType = "json"
): Observable<T> => {
    return defer(() =>
        api(baseURL).get<T>(url, { params, responseType })
    ).pipe(map((result) => result.data));
};

const post = <T>(
    url: string,
    body: object,
    params?: object,
    baseURL?: string
): Observable<T | void> => {
    return defer(() => api(baseURL).post<T>(url, body, { params })).pipe(
        map((result) => result.data)
    );
};

const put = <T>(
    url: string,
    body: object,
    params?: object,
    baseURL?: string
): Observable<T | void> => {
    return defer(() => api(baseURL).put<T>(url, body, { params })).pipe(
        map((result) => result.data)
    );
};

const patch = <T>(
    url: string,
    baseURL: string,
    body?: object,
    params?: object
): Observable<T | void> => {
    return defer(() => api(baseURL).patch<T>(url, body, { params })).pipe(
        map((result) => result.data)
    );
};

const deleteR = <T>(
    url: string,
    baseURL?: string
): Observable<T | void> => {
    return defer(() => api(baseURL).delete(`${url}`)).pipe(
        map((result) => result.data)
    );
};
export default { get, post, put, patch, deleteR };
