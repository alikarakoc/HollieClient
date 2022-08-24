import { Base } from "./base";

export interface Room extends Base {
    id?: number;
    code: string;
    name: string;
    hotelId: number;
    roomTypeId: number;
    clean: boolean;
    reservation?: boolean;
    status: boolean;
}
