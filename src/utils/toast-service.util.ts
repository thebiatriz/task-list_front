type ToastType = "success" | "warn" | "error" | "info"

interface ToastBase {
    severity?: ToastType;
    summary?: string;
    detail?: string;
    life?: number;
}

export class ToastService {
    public static success = (message: string, title = "Sucesso!", life = 3500) =>
        ToastService.showToast("success", message, title, life);
    public static warn = (message: string, title: string, life = 3500) =>
        ToastService.showToast("warn", message, title, life);
    public static error = (message: string, title: string, life = 3500) =>
        ToastService.showToast("error", message, title, life);
    public static info = (message: string, title: string, life = 3500) =>
        ToastService.showToast("info", message, title, life);

    public static showToast = (
        type: ToastType,
        message: string,
        title: string,
        life = 3500,
    ): ToastBase => ({
        severity: type,
        summary: title,
        detail: message,
        life,
    })
}