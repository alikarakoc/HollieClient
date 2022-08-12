import { AMarket } from "./amarket";

export interface Agency {
    code: string;
    id?: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    status: boolean;
    marketId: number;
    marketList: AMarket[];
}
