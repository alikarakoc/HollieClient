import { CAgency } from "./cagency";

export interface Contract {
    name: string;
    id?: number;
    code: string;
    price: number;
    enteredDate: Date;
    exitDate: Date;
    hotelId: number;
    marketId: number;
    categoryId: number;
    agencyId: number;
    agencyList: CAgency[];
    boardId: number;
    roomTypeId: number;
    currencyId: number;
}
