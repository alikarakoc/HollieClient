import { CAgency } from "./cagency";
import { CBoard } from "./cboard";
import { CMarket } from "./cmarket";
import { CRoomType } from "./croomtype";
import { CRoom } from "./croom";

export interface Contract {
    name: string;
    id?: number;
    code: string;
    adultPrice: number;
    childPrice:number;
    enteredDate: Date;
    exitDate: Date;
    hotelId: number;
    contDay? : number;
    //marketId: number;
    //categoryId: number;
    agencyId: number;
    agencyList: CAgency[];
    boardList: CBoard[];
    roomList: CBoard[];
    marketList: CMarket[];
    roomTypeList: CRoomType[];
    //boardId: number;
    //roomTypeId: number;
    currencyId: number;
    status: boolean;
}
