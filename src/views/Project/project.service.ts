import { Observable, Subject, take } from "rxjs";
import { ProjectRest, type TaskCreatePayload } from "../../service/rest/project.rest";

export class ProjectService {
    constructor(
        private _project = new ProjectRest()
    ) { }

    private allProjects$: Subject<any> = new Subject<any>();
    allProjects: Observable<any> = this.allProjects$.asObservable();

    private project$: Subject<any> = new Subject<any>();
    project: Observable<any> = this.project$.asObservable();

    private allTasks$: Subject<any> = new Subject<any>();
    allTasks: Observable<any> = this.allTasks$.asObservable();

    private task$: Subject<any> = new Subject<any>();
    task: Observable<any> = this.task$.asObservable();

    getProjects(): void {
        this._project
            .getProjects()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allProjects$.next(response);
                },
                error: (error) => {
                    this.allProjects$.error(error);
                }
            })
    }

    getProjectById(id: string): void {
        this._project
            .getProjectById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.project$.next(response);
                },
                error: (error) => {
                    this.project$.error(error);
                }
            })
    }

    deleteProject(id: string): void {
        this._project
            .deleteProject(id)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.project$.next(null);
                    this.allTasks$.next([]);
                    this.getProjects();
                },
                error: (error) => {
                    this.project$.error(error);
                }
            })
    }

    createProject(projectName: string): void {
        this._project
            .createProject(projectName)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.project$.next(response);
                    this.getProjects()
                },
                error: (error) => {
                    this.project$.error(error);
                }
            })
    }

    updateProject(id: string, projectName: string): void {
        this._project
            .updateProject(id, projectName)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.project$.next(response);
                },
                error: (error) => {
                    this.project$.error(error);
                }
            })
    }

    getTasks(id: string): void {
        this._project
            .getTasks(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allTasks$.next(response);
                },
                error: (error) => {
                    this.allTasks$.error(error);
                }
            })
    }

    createTask(id: string, task: TaskCreatePayload): void {
        this._project
            .createTask(id, task)
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
