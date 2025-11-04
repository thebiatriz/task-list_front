import type { Task } from "./task.model";

export class Project {
    constructor(
        public id: number,
        public name: string,
        public userId: number,
        public tasks: Task[]
    ) { }
}