import { Observable, Subject, take, tap } from "rxjs";
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
                    console.error("Erro ao criar task:", error);
                }
            })
    }

    deleteTask(id: string): Observable<any> {
        return this._task
            .deleteTask(id)
            .pipe(take(1),
                tap({
                    next: () => {
                        this.task$.next(null);
                    },
                    error: (error) => {
                        console.error("Erro ao criar task:", error);
                    }
                })
            )
    }

    updateTask(id: string, task: TaskUpdatePayload): Observable<any> {
        return this._task
            .updateTask(id, task)
            .pipe(take(1),
                tap({
                    next: (response) => {
                        this.task$.next(response);
                    },
                    error: (error) => {
                        console.error("Erro ao criar task:", error);
                    }
                })
            )
    }
}
