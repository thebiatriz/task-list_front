import type { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';

export class SaleRest {
    getSumSales(): Observable<any> {
        return api.get(`/Sale/Sum`);
    }
}