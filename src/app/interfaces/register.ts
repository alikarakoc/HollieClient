import { Base } from "src/app/interfaces/base";

export interface Register  extends Base{
    fullName: string;
    email : string;
    password: string;

}
