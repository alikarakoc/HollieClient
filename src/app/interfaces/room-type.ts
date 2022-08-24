import { Base } from "./base";

export interface RoomType extends Base{
    name: string;
    id: number;
    code: string;
    hotelId: number;
    maxAD: number;
    maxCH: number;
    pax: number;
    status: boolean;
}
