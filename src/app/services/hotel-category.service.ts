import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HotelCategory } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})

export class HotelCategoryService {

  baseUrl = `${environment.baseUrl}/HotelCategory`;
  categories: HotelCategory[] = [];

  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<ListResponseModel<HotelCategory>> {
    console.log("listResponseModel working");
    return this.http.get<ListResponseModel<HotelCategory>>(`${this.baseUrl}/AllHotelCategory`);
  }

  addCategory() { }

  deleteCategory() { }

  updateCategory() { }
}
