import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Hotel } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl = `${environment.baseUrl}/Hotels`;
  hotels: Hotel[] = [];

  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<ListResponseModel<Hotel>> {
    return this.http.get<ListResponseModel<Hotel>>(`${this.baseUrl}/AllHotels`);
  }

  addHotel(hotel: Partial<Hotel>) {
    return this.http.post<ListResponseModel<Hotel>>(`${this.baseUrl}/add`, hotel);
  }

  deleteHotel(hotel: Partial<Hotel>) {
    return this.http.delete<ListResponseModel<Hotel>>(`${this.baseUrl}/delete?Id=${hotel.id}`);
  }

  updateHotel(hotel: Partial<Hotel>) {
    return this.http.put<ListResponseModel<Hotel>>(`${this.baseUrl}/update?Id=${hotel.id}`, hotel);
  }


}
