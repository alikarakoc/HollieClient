export interface Contract {
    name: string;
    id?: number;
    code: string;
    price: number;
    enteredDate: Date;
    exitDate: Date;
    hotelId: number;
    marketIds: number[];
    categoryIds: number[];
    agencyIds: number[];
    boardIds: number[];
    roomTypeIds: number[];
    currencyId: number;
}
