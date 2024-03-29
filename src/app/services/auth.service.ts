import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string="https://localhost:44383/api/User"
   jwtHelper= new JwtHelperService();
   decodedToken:any;
  constructor(private http:HttpClient) { }

  login(model:any) {
    return this.http.post(this.baseUrl+'/login', model).pipe(
      map((response:any) =>{
       const result=response;
        if (result){
          localStorage.setItem("token",result.data.token),
          localStorage.setItem("username", result.data.username)
          this.decodedToken=this.jwtHelper.decodeToken(result.data.token);
         
        }
      })
    )
  }
  loggedIn(){
    const token:any =localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model:any) {
    localStorage.setItem("isSuccessful", "false");
    return this.http.post(this.baseUrl+'/register', model).pipe(
      map((response:any) =>{
       const result=response;
      if (result){
        localStorage.setItem("isSuccessful", result.isSuccessful)}
        console.log(localStorage.getItem("isSuccessful"));
      }))  }

  reg(){
    const token:any =localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
