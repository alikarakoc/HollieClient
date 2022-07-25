export interface Contract {
    name: string;
    id?: number;
    code: string;
    price: number;
    start: Date;
    end: Date;
    hotelId: number;
    marketId: number;
    categoryId: number;
    agencyId: number;
    boardId: number;
    roomTypeId: number;
    currencyId: number;
}
