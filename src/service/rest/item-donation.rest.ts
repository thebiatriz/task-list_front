import type { Observable } from "rxjs";
import type { QueryParams } from "../../models/query-params.model";
import api from '../api-Config/rxjs.config';
import type { ItemDonationDto } from "../../models/item-donation-dto.model";

export class ItemDonationRest {
    getItemDonationById(id: string): Observable<any> {
        return api.get(`/ItemDonation/${id}`);
    }
    getAllItemDonations(params?: QueryParams): Observable<any> {
        return api.get(`/ItemDonation/Paged`, params);
    }
    createItemDonation(itemDonationBody: ItemDonationDto): Observable<any> {
        return api.post(`/ItemDonation`, itemDonationBody);
    }
}