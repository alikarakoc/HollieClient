import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { AMarket } from '../interfaces/amarket';

@Injectable({
    providedIn: 'root'
})

export class AMarketService{
    cmarkets : AMarket [] = [];
    baseUrl = `${environment.baseUrl}/AMarket`;
    constructor(private http: HttpClient) { }

    getAllAMarkets (): Observable<ListResponseModel<AMarket>>{
        return this.http.get<ListResponseModel<AMarket>>(`${this.baseUrl}/AllAMarkets`);
    }
}
