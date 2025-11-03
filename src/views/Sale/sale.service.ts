import { Observable, Subject, take } from "rxjs";
import { SaleRest } from "../../service/rest/sale.rest";

export class SaleService {
    constructor(
        private _sale = new SaleRest(),
    ) { }

    private sumSales$: Subject<any> = new Subject<any>();
    sumSales: Observable<any> = this.sumSales$.asObservable();

    getSumSales(): void {
        this._sale
            .getSumSales()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.sumSales$.next(response);
                },
                error: (error) => {
                    this.sumSales$.error(error);
                }
            })
    }
}
