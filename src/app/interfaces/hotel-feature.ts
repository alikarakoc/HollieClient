import { Base } from "./base";

export interface HotelFeature extends Base{
    id: number;
    code :string;
    name: string,
    babyTop: number;
    childTop: number;
    teenTop: number;
    status: boolean;
}
