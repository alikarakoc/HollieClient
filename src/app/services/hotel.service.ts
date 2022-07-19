import { Injectable } from '@angular/core';
import { Hotel } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
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

  addNewHotel() { }

  deleteHotel() { }

  constructor() { }
}
