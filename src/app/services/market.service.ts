import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Market } from "../interfaces";
import { ListResponseModel } from "../interfaces/listResponseModel";

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  rooms: Market[] = [];
  baseUrl = `${environment.baseUrl}/Market`;

  constructor(private httpClient: HttpClient) { }

  getAllRoomTypes(): Observable<ListResponseModel<Market>> {
    return this.httpClient.get<ListResponseModel<Market>>(`${this.baseUrl}/AllMarket`);
  }

  addRoomType(market: Partial<Market>) {
    return this.httpClient.post<ListResponseModel<Market>>(`${this.baseUrl}/AddMarket`, market);
  }

  deleteRoomType(market: Partial<Market>) {
    return this.httpClient.delete<ListResponseModel<Market>>(`${this.baseUrl}/DeleteMarket?Id=${market.id}`)
  }

  updateRoomType(market: Partial<Market>) {
    return this.httpClient.put<ListResponseModel<Market>>(`${this.baseUrl}/UpdateMarket?Id=${market.id}`, market);
  }
}