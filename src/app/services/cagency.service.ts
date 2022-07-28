import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { CAgency } from '../interfaces/cagency';


@Injectable({
    providedIn: 'root'
})
export class CAgencyService {
    cagencies: CAgency[] = [];
    baseUrl = `${environment.baseUrl}/CAgency`;
    constructor(private http: HttpClient) { }

    getAllCAgencies(): Observable<ListResponseModel<CAgency>> {

        return this.http.get<ListResponseModel<CAgency>>(`${this.baseUrl}/AllCAgencies`);
    }


}