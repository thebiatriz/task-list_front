import { Observable, Subject, take } from "rxjs";
import { ItemRest } from "../../service/rest/item.rest";

export class ItemService {
    constructor(
        private _item = new ItemRest(),
    ) { }

    private itemList$: Subject<any> = new Subject<any>();
    itemList: Observable<any> = this.itemList$.asObservable();

    getItemList(): void {
        this._item
            .getItemList()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.itemList$.next(response);
                },
                error: (error) => {
                    this.itemList$.error(error);
                }
            })
    }
}
