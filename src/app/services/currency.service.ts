import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Currency } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl = `${environment.baseUrl}/Currencies`;
  currencies: Currency[] = [];

  constructor(private http: HttpClient) { }

  getAllCurrency(): Observable<ListResponseModel<Currency>> {
    return this.http.get<ListResponseModel<Currency>>(`${this.baseUrl}/AllCurrency`);
  }

  updateCurrencyValue(): Observable<ListResponseModel<Currency>> {
    return this.http.get<ListResponseModel<Currency>>(`${this.baseUrl}/updateCurrency`);
  }

  addCurrency(currency: Partial<Currency>) {
    return this.http.post<ListResponseModel<Currency>>(`${this.baseUrl}/add`, currency);
  }

  deleteCurrency(currency: Partial<Currency>) {
    return this.http.delete<ListResponseModel<Currency>>(`${this.baseUrl}/delete?Id=${currency.id}`);
  }

  updateCurrency(currency: Partial<Currency>) {
    return this.http.put<ListResponseModel<Currency>>(`${this.baseUrl}/update?Id=${currency.id}`, currency);
  }
}
