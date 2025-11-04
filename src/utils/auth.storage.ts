import type { AuthUser } from "../models/auth.model";

export function saveAuthData(user: AuthUser, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export function getStoredToken(): string | null {
    return localStorage.getItem('token');
}

export function getStoredUser(): AuthUser | null {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser) as AuthUser
    } catch (error) {
        console.log("Erro ao realizar a conversão do usuário em JSON do localStorage", error)
        clearAuthData()
        return null
    }
}