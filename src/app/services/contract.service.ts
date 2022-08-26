import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract, SearchContract } from "../interfaces";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';

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

  searchAccommodation(searchAccommodation:  Partial<SearchContract>){
    return this.http.post<ListResponseModel<Contract>>(`${this.baseUrl}/searchAccommodation`, searchAccommodation);
  }

  constructor(private http: HttpClient) { }
}
