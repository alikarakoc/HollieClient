import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { CBoard } from '../interfaces/cboard';

@Injectable({
    providedIn: 'root'
})

export class CBoardService{
    cboards : CBoard [] = [];
    baseUrl = `${environment.baseUrl}/CBoard`;
    constructor(private http: HttpClient) { }

    getAllCBoards (): Observable<ListResponseModel<CBoard>>{
        return this.http.get<ListResponseModel<CBoard>>(`${this.baseUrl}/AllCBoards`);
    }
}   