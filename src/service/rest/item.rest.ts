import type { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';

export class ItemRest {
    getItemList(): Observable<any> {
        return api.get(`/Item/ItemList`);
    }
}