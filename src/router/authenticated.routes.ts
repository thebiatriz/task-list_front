import type { RouteRecordRaw } from "vue-router";
import { Views } from "../views/index";
export const authenticatedRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Views.Home,
    },
    {
        path: "/users",
        name: "user",
        component: Views.User,
    },
    {
        path: "/projects",
        name: "project",
        component: Views.Project,
    },
    {
        path: "/projects/:id/tasks",
        name: "task",
        component: Views.Task,
    }
];


