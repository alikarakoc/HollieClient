import { Base } from "./base";

export interface HotelCategory extends Base{
    id: number;
    name: string;
    code :string;
    status: boolean;
}
