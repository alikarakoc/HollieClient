import { Base } from "./base";

export interface Country extends Base{
    name: string;
    id: number;
    code: string;
    status: boolean;
}
