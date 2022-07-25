import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from "../interfaces";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  baseUrl = `${environment.baseUrl}/Contract`;
  contracts : Contract[] = [];
  getAllContracts(): Observable<ListResponseModel<Contract>> {
    return this.http.get<ListResponseModel<Contract>>(`${this.baseUrl}/AllContracts`);
  }

  addContract(contract: Partial<Contract>) {
    return this.http.post<ListResponseModel<Contract>>(`${this.baseUrl}/add`, contract);
  }

  deleteContract(contract: Partial<Contract>) {
    return this.http.delete<ListResponseModel<Contract>>(`${this.baseUrl}/delete?Id=${contract.id}`);
  }

  updateContract(contract: Partial<Contract>) {
    return this.http.put<ListResponseModel<Contract>>(`${this.baseUrl}/update?Id=${contract.id}`, contract);
  }
  
  constructor(private http: HttpClient) { }
}
