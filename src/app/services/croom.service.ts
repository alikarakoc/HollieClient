import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { CRoom } from '../interfaces/croom';


@Injectable({
    providedIn: 'root'
})
export class CRoomService {
    crooms: CRoomService[] = [];
    baseUrl = `${environment.baseUrl}/CRoom`;
    constructor(private http: HttpClient) { }

    getAllCRooms(): Observable<ListResponseModel<CRoom>> {

        return this.http.get<ListResponseModel<CRoom>>(`${this.baseUrl}/AllCRooms`);
    }


}