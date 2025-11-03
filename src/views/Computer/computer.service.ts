import { Observable, Subject, take } from "rxjs";
import { ComputerRest } from "../../service/rest/computer.rest";
import { Computer } from "../../models/computer.model";
import type { QueryParams } from "../../models/query-params.model";

export class ComputerService {
    constructor(
        private _computer = new ComputerRest(),
    ) { }

    private allComputers$: Subject<any> = new Subject<any>();
    allComputers: Observable<any> = this.allComputers$.asObservable();

    private computer$: Subject<any> = new Subject<any>();
    computer: Observable<any> = this.computer$.asObservable();

    getAllComputers(params?: QueryParams): void {
        this._computer
            .getAllComputers(params)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allComputers$.next(response);
                },
                error: (error) => {
                    this.allComputers$.error(error);
                }
            })
    }

    getComputerById(id: string): void {
        this._computer
            .getComputerById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.computer$.next(response);
                },
                error: (error) => {
                    this.computer$.error(error);
                }
            })
    }

    deleteComputer(id: number): void {
        this._computer
            .deleteComputer(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.computer$.next(response);
                },
                error: (error) => {
                    this.computer$.error(error);
                }
            })
    }

    createComputer(computerBody: Computer): void {
        this._computer
            .createComputer(computerBody)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.computer$.next(response);
                },
                error: (error) => {
                    this.computer$.error(error);
                }
            })
    }

    updateComputer(id: string, computerBody: Computer): void {
        this._computer
            .updateComputer(id, computerBody)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.computer$.next(response);
                },
                error: (error) => {
                    this.computer$.error(error);
                }
            })
    }
}
