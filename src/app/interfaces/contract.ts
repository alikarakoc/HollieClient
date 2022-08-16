import { CAgency } from "./cagency";
import { CBoard } from "./cboard";
import { CMarket } from "./cmarket";
import { CRoomType } from "./croomtype";
import { CRoom } from "./croom";

export interface Contract {
    name: string;
    id?: number;
    code: string;
    hotelId: number;
    //contDay? : number;
    currencyId: number;
    enteredDate: Date;
    exitDate: Date;
    adp: number;
    cH1: number;
    cH2: number;
    cH3: number;
    agencyList: CAgency[];
    boardList: CBoard[];
    roomList: CRoom[];
    marketList: CMarket[];
    status: boolean;
}
