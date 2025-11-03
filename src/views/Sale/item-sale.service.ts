import { Observable, Subject, take } from "rxjs";
import type { QueryParams } from "../../models/query-params.model";
import { ItemSaleRest } from "../../service/rest/item-sale.rest";
import type { ItemSaleDto } from "../../models/item-sale-dto.model";

export class ItemSaleService {
    constructor(
        private _itemSale = new ItemSaleRest(),
    ) { }

    private allSales$: Subject<any> = new Subject<any>();
    allSales: Observable<any> = this.allSales$.asObservable();

    private sale$: Subject<any> = new Subject<any>();
    sale: Observable<any> = this.sale$.asObservable();

    getAllItemSales(params?: QueryParams): void {
        this._itemSale
            .getAllItemSales(params)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allSales$.next(response);
                },
                error: (error) => {
                    this.allSales$.error(error);
                }
            })
    }

    getItemSaleById(id: string): void {
        this._itemSale
            .getItemSaleById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.sale$.next(response);
                },
                error: (error) => {
                    this.sale$.error(error);
                }
            })
    }

    createItemSale(itemSaleBody: ItemSaleDto): void {
        this._itemSale
            .createItemSale(itemSaleBody)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.sale$.next(response);
                },
                error: (error) => {
                    this.sale$.error(error);
                }
            })
    }
}
