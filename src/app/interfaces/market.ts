import { Base } from "./base";

export interface Market extends Base{
    id: number;
    name: string;
    code:string;
    status: boolean;
}
