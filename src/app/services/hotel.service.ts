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
  baseUrl = `${environment.baseUrl}/Hotel`;
  hotels: Hotel[] = [
    {
      name: "Barut",
      code: "1",
      address: "lARA",
      email: "info@Bbarut.com",
      phone: "555 323 2323"
    },
    {
      name: "hotel",
      code: "2",
      address: "konyaaltı",
      email: "hotel@info",
      phone: "555 555 55 55"
    },
  ];

  getAllHotels(): Observable<ListResponseModel<Hotel>> {
    return this.http.get<ListResponseModel<Hotel>>(`${this.baseUrl}/AllHotel`);
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

  constructor(private http: HttpClient) { }
}
