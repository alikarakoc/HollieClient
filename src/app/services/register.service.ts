import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../interfaces/listResponseModel';
import { Register } from '../interfaces/register';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user :Register[] = [];
  baseUrl = `https://localhost:44383/api/User/register`;

  constructor( private http : HttpClient) { }

  registerUser( user: Partial<Register>): Observable<ListResponseModel<Register>>{
   
    return this.http.post<ListResponseModel<Register>>(this.baseUrl, user);
  }
}
