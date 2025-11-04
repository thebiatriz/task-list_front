import { AuthRequest } from "../../models/auth.model";
import { Observable } from "rxjs";
import api from "../api-Config/rxjs.config";

export class LoginRest {
    login(body: AuthRequest): Observable<any> {
        return api.post("/login", body);
    }
}