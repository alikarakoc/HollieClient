export interface Contract {
    name: string;
    id?: number;
    code: string;
    price: number;
    start: Date;
    end: Date;
    hotel: number;
    market: number;
    category: number;
    agency: number;
    board: number;
    roomType: number;
    currency: number;
}
