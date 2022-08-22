import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../interfaces/listResponseModel';
import { Login } from '../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user :Login[] = [];
  baseUrl = `https://localhost:44383/api/User/Login`;

  constructor( private http : HttpClient) { }

  loginUser( user: Partial<Login>): Observable<ListResponseModel<Login>>{
    debugger;
    return this.http.post<ListResponseModel<Login>>(this.baseUrl, user);
  }
}
