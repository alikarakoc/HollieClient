import { AMarket } from "./amarket";
import { Base } from "./base";

export interface Agency extends Base {
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
