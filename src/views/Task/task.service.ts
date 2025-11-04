import { Observable, Subject, take } from "rxjs";
import { TaskRest, type TaskUpdatePayload } from "../../service/rest/task.rest";

export class TaskService {
    constructor(
        private _task = new TaskRest()
    ) { }

    private task$: Subject<any> = new Subject<any>();
    task: Observable<any> = this.task$.asObservable();

    getTaskById(id: string): void {
        this._task
            .getTaskById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.task$.next(response);
                },
                error: (error) => {
                    this.task$.error(error);
                }
            })
    }

    deleteTask(id: string): void {
        this._task
            .deleteTask(id)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.task$.next(null);
                },
                error: (error) => {
                    this.task$.error(error);
                }
            })
    }

    updateTask(id: string, task: TaskUpdatePayload): void {
        this._task
            .updateTask(id, task)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.task$.next(response);
                },
                error: (error) => {
                    this.task$.error(error);
                }
            })
    }
}
