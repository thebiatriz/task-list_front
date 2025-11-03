export class Item {
    constructor(
        public id: number,
        public brand: string | null,
        public cpu: string,
        public quantity: number,
        public status: string,
        public date: Date,
    ) { }
}