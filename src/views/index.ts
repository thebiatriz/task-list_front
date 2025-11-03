export class Views {
    static Home(): Promise<any> {
        return import("./Home/home.vue");
    }

    static Computer(): Promise<any> {
        return import("./Computer/computer.vue");
    }

    static ComputerForm(): Promise<any> {
        return import("./Computer/computer-form.vue");
    }

    static Donation(): Promise<any> {
        return import("./Donation/donation.vue");
    }

    static Sale(): Promise<any> {
        return import("./Sale/sale.vue");
    }

    static ComputerOutput(): Promise<any> {
        return import("./ComputerOutput/computer-output.vue");
    }

    static NotFound(): Promise<any> {
        return import("./NotFound/not-found.vue");
    }

    static Team(): Promise<any> {
        return import("./Team/team.vue");
    }
}