import { Base } from "./base";
import { CAgency } from "./cagency";
import { CBoard } from "./cboard";
import { CMarket } from "./cmarket";
import { CRoomType } from "./croomtype";

export interface Contract extends Base{
    name: string;
    id?: number;
    code: string;
    hotelId: number;
    //contDay? : number;
    totalPrice: number;
    currencyId: number;
    enteredDate: Date;
    exitDate: Date;
    adp: number;
    cH1: number;
    cH2: number;
    cH3: number;
    agencyList: CAgency[];
    boardList: CBoard[];
    roomTypeList: CRoomType[];
    marketList: CMarket[];
    status: boolean;
}
