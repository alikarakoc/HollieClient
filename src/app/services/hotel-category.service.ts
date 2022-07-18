import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelCategory } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})


export class HotelCategoryService {

  baseUrl = 'https://localhost:5001/api/HotelCategory/AllHotelCategory';
  categories: HotelCategory[] = [
    {
      id: "1",
      name: "Resort Hotel"
    },
    {
      id: "2",
      name: "City Hotel"
    },
    {
      id: "3",
      name: "B&B"
    }
  ];

  constructor(private http: HttpClient) { }



  getAllHotels() :  Observable<ListResponseModel<HotelCategory>>{
    console.log("listResponseModel working");
     return this.http.get<ListResponseModel<HotelCategory>>(this.baseUrl);
 
   }
}
