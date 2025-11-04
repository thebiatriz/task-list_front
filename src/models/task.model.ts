export class Task {
    constructor(
        public id: number,
        public description: string,
        public isComplete: boolean,
        public projectId: number,
    ) { }
}