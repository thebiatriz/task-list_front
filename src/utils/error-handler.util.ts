import type { AxiosError } from 'axios';
import { ToastService } from './toast-service.util';
import { MessageToasts } from './toast-messages.util';
import app from '../main';

export function handleApiError(error: unknown, customMessage: string = MessageToasts.ERROR_GENERIC): never {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const serverMessage = (axiosError.response?.data as any)?.message?.[0];

    let handled = false;

    switch (status) {
        case 400:
            app.config.globalProperties.$toast.add(ToastService.error(serverMessage || 'Dados inválidos.', 'Erro de validação'));
            handled = true;
            break;

        case 403:
            app.config.globalProperties.$toast.add(ToastService.error(MessageToasts.ERROR_FORBIDDEN, 'Acesso negado'));
            handled = true;
            break;

        case 404:
            app.config.globalProperties.$toast.add(ToastService.error(MessageToasts.ERROR_NOT_FOUND, 'Não encontrado'));
            handled = true;
            break;

        case 500:
            app.config.globalProperties.$toast.add(ToastService.error(MessageToasts.ERROR_SERVER, 'Erro no servidor'));
            handled = true;
            break;
    }

    if (!handled) {
        app.config.globalProperties.$toast.add(ToastService.error(customMessage, 'Erro'));
    }

    throw error;
}