import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { CRoomType } from '../interfaces/croomtype';


@Injectable({
    providedIn: 'root'
})
export class CRoomTypeService {
    croomtypes: CRoomTypeService[] = [];
    baseUrl = `${environment.baseUrl}/CRoomType`;
    constructor(private http: HttpClient) { }

    getAllCRoomTypes(): Observable<ListResponseModel<CRoomType>> {

        return this.http.get<ListResponseModel<CRoomType>>(`${this.baseUrl}/AllCRoomTypes`);
    }


}