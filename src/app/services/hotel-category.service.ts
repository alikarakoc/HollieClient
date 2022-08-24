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
    return this.http.get<ListResponseModel<HotelCategory>>(`${this.baseUrl}/AllHotelCategory`);
  }

  addCategory(category: Partial<HotelCategory>) {
    return this.http.post<ListResponseModel<HotelCategory>>(`${this.baseUrl}/add`, category);
  }

  deleteCategory(category: Partial<HotelCategory>) {
    return this.http.delete<ListResponseModel<HotelCategory>>(`${this.baseUrl}/delete`, {body: category});
  }

  updateCategory(category: Partial<HotelCategory>) {
    return this.http.put<ListResponseModel<HotelCategory>>(`${this.baseUrl}/update`, category);
  }
}
