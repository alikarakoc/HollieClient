import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { CMarket } from '../interfaces/cmarket';

@Injectable({
    providedIn: 'root'
})

export class CMarketService{
    cmarkets : CMarket [] = [];
    baseUrl = `${environment.baseUrl}/CMarket`;
    constructor(private http: HttpClient) { }

    getAllCMarkets (): Observable<ListResponseModel<CMarket>>{
        return this.http.get<ListResponseModel<CMarket>>(`${this.baseUrl}/AllCMarkets`);
    }
}   