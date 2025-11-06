import type { RouteRecordRaw } from "vue-router";
import { Views } from "../views/index";
export const authenticatedRoutes: Array<RouteRecordRaw> = [
    {
        path: "/users",
        name: "user",
        component: Views.User,
    },
    {
        path: "/",
        name: "project",
        component: Views.Project,
    },
    {
        path: "/projects/:id/tasks",
        name: "task",
        component: Views.Task,
    }
];


