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
       debugger
        if (result){
          debugger;
          localStorage.setItem("token",result.data.token)
          console.log(localStorage);
          
          this.decodedToken=this.jwtHelper.decodeToken(result.data.token);
          console.log(this.decodedToken);
        }
      })
    )
  }
  loggedIn(){
    const token:any =localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

}
