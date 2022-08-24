import { Base } from "./base";

export interface Board extends Base{
    code : string;
    name : string;
    id : number;
    status: boolean;
}