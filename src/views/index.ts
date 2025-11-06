export class Views {
    static NotFound(): Promise<any> {
        return import("./NotFound/not-found.vue");
    }

    static User(): Promise<any> {
        return import("./User/user.vue");
    }

    static Project(): Promise<any> {
        return import("./Project/project.vue");
    }

    static Task(): Promise<any> {
        return import("./Task/task.vue");
    }

    static Login(): Promise<any> {
        return import("./Login/login.vue");
    }
}