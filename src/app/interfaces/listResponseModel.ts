import { ResponseModel } from "./responseModel";

export class ListResponseModel<T> extends ResponseModel{
    data :  T[];
}