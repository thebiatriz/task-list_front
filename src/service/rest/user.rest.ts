import { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';
import { User } from "../../models/user.model";

export interface UserCreatePayload {
    name: string;
    email: string;
    password: string;
}

export type UserUpdatePayload = Partial<Pick<User, 'name' | 'email'>>;

export class UserRest {
    getUsers(): Observable<any> {
        return api.get('/users');
    }
    getUserById(id: string): Observable<any> {
        return api.get(`/users/${id}`);
    }
    deleteUser(): Observable<any> {
        return api.deleteR('/users');
    }
    createUser(userBody: UserCreatePayload): Observable<any> {
        return api.post(`/users`, userBody);
    }
    updateUser(userData: UserUpdatePayload): Observable<any> {
        return api.put('/users', userData);
    }
}