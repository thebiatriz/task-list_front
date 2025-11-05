import { AuthRequest, AuthResponse, AuthUser } from "../../models/auth.model";
import { LoginRest } from "../../service/rest/login.rest";
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { clearAuthData, getStoredUser, saveAuthData } from "../../utils/auth.storage";

export class LoginService {
    constructor(
        private _login = new LoginRest()
    ) {
        const user = getStoredUser();
        if (user) {
            this.user$.next(user)
        }
    }

    private user$: BehaviorSubject<AuthUser | null> = new BehaviorSubject<AuthUser | null>(null);
    user: Observable<AuthUser | null> = this.user$.asObservable();

    login(body: AuthRequest): Observable<AuthResponse> {
        return this._login.login(body).pipe(
            tap({
                next: (response: AuthResponse) => {
                    saveAuthData(response.user, response.token);
                    this.user$.next(response.user);
                }, error: (error) => {
                    console.error("Erro no login:", error);
                }
            })
        );
    }

    logout(): void {
        clearAuthData();
        this.user$.next(null);
    }

}
