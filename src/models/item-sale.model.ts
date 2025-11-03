export interface SaleDetails {
    saleDate: Date;
    priceSale: number;
}

export class ItemSale {
    constructor(
        public id: number,
        public computerId: number,
        public brand: string | null,
        public cpu: string,
        public saleId: number,
        public sale: SaleDetails,
        public quantity: number,
        public status: string,
    ) { }
}