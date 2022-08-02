import { CAgency } from "./cagency";
import { CBoard } from "./cboard";
import { CMarket } from "./cmarket";
import { CRoomType } from "./croomtype";

export interface Contract {
    name: string;
    id?: number;
    code: string;
    price: number;
    enteredDate: Date;
    exitDate: Date;
    hotelId: number;
    //marketId: number;
    //categoryId: number;
    //agencyId: number;
    agencyList: CAgency[];
    boardList: CBoard[];
    marketList: CMarket[];
    roomTypeList: CRoomType[];
    //boardId: number;
    //roomTypeId: number;
    currencyId: number;
    status: boolean;
}
