import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract, SearchContract, Price, SearchContractAko } from "../interfaces";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { Accommodation } from '../interfaces/accommodation';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  baseUrl = `${environment.baseUrl}/Contract`;
  contracts: Contract[] = [];
  getAllContracts(): Observable<ListResponseModel<Contract>> {
    return this.http.get<ListResponseModel<Contract>>(`${this.baseUrl}/AllContract`);
  }

  addContract(contract: Partial<Contract>) {
    return this.http.post<ListResponseModel<Contract>>(`${this.baseUrl}/add`, contract);
  }

  deleteContract(contract: Partial<Contract>) {
    return this.http.delete<ListResponseModel<Contract>>(`${this.baseUrl}/delete`, { body: contract });
  }

  updateContract(contract: Partial<Contract>) {
    return this.http.put<ListResponseModel<Contract>>(`${this.baseUrl}/update`, contract );
  }

  searchContract(searchContract:  Partial<SearchContract>){
    return this.http.post<ListResponseModel<Contract>>(`${this.baseUrl}/searchContract`, searchContract);
  }

  searchAccommodation(searchAccommodation:  Partial<SearchContractAko>){
    return this.http.post<ListResponseModel<Price>>(`${this.baseUrl}/searchAccommodation`, searchAccommodation);
  }

  detailAccommodation(detailAccommodation:  Partial<SearchContract>){
    return this.http.post<ListResponseModel<Accommodation>>(`${this.baseUrl}/detailAccommodation`, detailAccommodation);
  }



  constructor(private http: HttpClient) { }
}
