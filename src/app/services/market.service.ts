import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Market } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  baseUrl = `${environment.baseUrl}/Market`;
  markets: Market[] = [];

  constructor(private http: HttpClient) { }

  getAllMarkets(): Observable<ListResponseModel<Market>> {
    return this.http.get<ListResponseModel<Market>>(`${this.baseUrl}/AllMarkets`);
  }

  addMarket(market: Partial<Market>) {
    return this.http.post<ListResponseModel<Market>>(`${this.baseUrl}/add`, market);
  }

  deleteMarket(market: Partial<Market>) {
    return this.http.delete<ListResponseModel<Market>>(`${this.baseUrl}/delete?Id=${market.id}`);
  }

  updateMarket(market: Partial<Market>) {
    return this.http.put<ListResponseModel<Market>>(`${this.baseUrl}/update?Id=${market.id}`, market);
  }
}


