import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/interfaces/listResponseModel';
import { Register } from 'src/app/interfaces/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  newUser : Register[] = [];
  baseUrl = `${environment.baseUrl}/Hotels`;

constructor(
  private http : HttpClient
) { }

register(newUser : Partial<Register>): Observable<ListResponseModel<Register>> {
  return this.http.post<ListResponseModel<Register>>(this.baseUrl,newUser);

}
getAll() {
  return this.http.get<ListResponseModel<Register>>((`${this.baseUrl}/AllUsers`));
}

delete(id: number) {
  return this.http.delete(`${this.baseUrl}/users/${id}`);
}

}
