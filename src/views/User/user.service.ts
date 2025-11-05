import { Observable, Subject, take, tap } from "rxjs";
import { UserRest, type UserCreatePayload, type UserUpdatePayload } from "../../service/rest/user.rest";

export class UserService {
    constructor(
        private _user = new UserRest()
    ) { }

    private allUsers$: Subject<any> = new Subject<any>();
    allUsers: Observable<any> = this.allUsers$.asObservable();

    private user$: Subject<any> = new Subject<any>();
    user: Observable<any> = this.user$.asObservable();

    getUsers(): void {
        this._user
            .getUsers()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allUsers$.next(response);
                },
                error: (error) => {
                    this.allUsers$.error(error);
                }
            })
    }

    getUserById(id: string): void {
        this._user
            .getUserById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.user$.next(response);
                },
                error: (error) => {
                    this.user$.error(error);
                }
            })
    }

    deleteUser(): Observable<any> {
        return this._user
            .deleteUser()
            .pipe(
                take(1),
                tap({
                    next: () => {
                        this.user$.next(null);
                        this.getUsers();
                    },
                    error: (error) => {
                        console.error(error);
                    }
                })
            );
    }

    createUser(userBody: UserCreatePayload): Observable<any> {
        return this._user
            .createUser(userBody)
            .pipe(take(1),
                tap({
                    next: (response) => {
                        this.user$.next(response);
                        this.getUsers();
                    },
                    error: (error) => {
                        console.error(error)
                    }
                })
            );
    }

    updateUser(userBody: UserUpdatePayload): Observable<any> {
        return this._user
            .updateUser(userBody)
            .pipe(
                take(1),
                tap({
                    next: (response) => {
                        this.user$.next(response);
                    }, error: (error) => {
                        console.error(error);
                    }
                })
            )

    }
}
