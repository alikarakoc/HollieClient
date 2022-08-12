import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HotelFeature } from '../interfaces/hotel-feature';

@Injectable({
  providedIn: 'root'
})
export class HotelFeatureService {
  baseUrl = `${environment.baseUrl}/HotelFeatures`;
  features: HotelFeature[] = [];
  constructor(private http: HttpClient) { }

  getAllFeatures(): Observable<ListResponseModel<HotelFeature>> {
    return this.http.get<ListResponseModel<HotelFeature>>(`${this.baseUrl}/all`);
  }

  addFeature(feature: Partial<HotelFeature>) {
    return this.http.post<ListResponseModel<HotelFeature>>(`${this.baseUrl}/add`, feature);
  }

  deleteFeature(feature: Partial<HotelFeature>) {
    return this.http.delete<ListResponseModel<HotelFeature>>(`${this.baseUrl}/delete`, { body: feature });
  }

  updateFeature(feature: Partial<HotelFeature>) {
    return this.http.put<ListResponseModel<HotelFeature>>(`${this.baseUrl}/update`, feature );
  }

}
