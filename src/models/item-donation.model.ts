export interface DonationDetails {
    dateDonation: Date;
}

export class ItemDonation {
    constructor(
        public id: number,
        public computerId: number,
        public brand: string | null,
        public cpu: string,
        public donationId: number,
        public donation: DonationDetails,
        public quantity: number,
        public status: string,
    ) { }
}