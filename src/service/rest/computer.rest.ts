import { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';
import { Computer } from "../../models/computer.model";
import type { QueryParams } from "../../models/query-params.model";

export class ComputerRest {
    getComputerById(id: string): Observable<any> {
        return api.get(`/Computer/${id}`);
    }
    getAllComputers(params?: QueryParams): Observable<any> {
        return api.get(`/Computer/Paged`, params);
    }
    deleteComputer(id: number): Observable<any> {
        return api.deleteR(`/Computer/${id}`);
    }
    createComputer(computerBody: Computer): Observable<any> {
        return api.post(`/Computer`, computerBody);
    }
    updateComputer(id: string, computerData: Computer): Observable<any> {
        return api.put(`/Computer/${id}`, computerData);
    }
}