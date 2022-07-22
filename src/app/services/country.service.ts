import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from "../interfaces";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = `${environment.baseUrl}/Country`;
  countries: Country[] = [];


  getAllCountries(): Observable<ListResponseModel<Country>> {
    return this.http.get<ListResponseModel<Country>>(`${this.baseUrl}/AllCountries`);
  }

  addCountry(country: Partial<Country>) {
    return this.http.post<ListResponseModel<Country>>(`${this.baseUrl}/add`, country);
  }

  deleteCountry(country: Partial<Country>) {
    return this.http.delete<ListResponseModel<Country>>(`${this.baseUrl}/delete?Id=${country.id}`);
  }

  updateCountry(country: Partial<Country>) {
    return this.http.put<ListResponseModel<Country>>(`${this.baseUrl}/update?Id=${country.id}`, country);
  }

  constructor(private http: HttpClient) { }
}
