import { AuthRequest } from "../../models/auth.model";
import { LoginRest } from "../../service/rest/login.rest";
import { Observable, Subject } from "rxjs";

export class LoginService {
    constructor(
        private _login = new LoginRest()
    ) { }

    private login$: Subject<AuthRequest> = new Subject<AuthRequest>();
    login: Observable<AuthRequest> = this.login$.asObservable();

    loginService(body: AuthRequest): void {
        this._login
            .login(body)
            .pipe()
            .subscribe({
                next: (response) => {
                    this.login$.next(response);
                }, error(err) {
                    return err
                }
            });
    }
}
