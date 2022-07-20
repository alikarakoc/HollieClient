import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Agency } from "../interfaces";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  agencies: Agency[] = [];
  baseUrl = `${environment.baseUrl}/Agency`;

  constructor(private http: HttpClient) { }

  getAllAgencies():Observable<ListResponseModel<Agency>>{
    return this.http.get<ListResponseModel<Agency>>(`${this.baseUrl}/AllAgency`);
  }

  addAgency(agency: Partial<Agency>) {
    return this.http.post<ListResponseModel<Agency>>(`${this.baseUrl}/add`, agency);
   }

  deleteAgency(agency: Partial<Agency>) { 
    return this.http.delete<ListResponseModel<Agency>>(`${this.baseUrl}/delete?Id=${agency.id}`);
  }

  updateAgency(agency: Partial<Agency>) {
    return this.http.put<ListResponseModel<Agency>>(`${this.baseUrl}/update?Id=${agency.id}`, agency);
  }
}
