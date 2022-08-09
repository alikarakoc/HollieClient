import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = `${environment.baseUrl}/Rooms`;
  rooms: Room[] = [];

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<ListResponseModel<Room>> {
    return this.http.get<ListResponseModel<Room>>(`${this.baseUrl}/AllRooms`);
  }

  addRoom(room: Partial<Room>) {
    return this.http.post<ListResponseModel<Room>>(`${this.baseUrl}/add`, room);
  }

  deleteRoom(room: Partial<Room>) {
    return this.http.delete<ListResponseModel<Room>>(`${this.baseUrl}/delete?Id=${room.id}`);
  }

  updateRoom(room: Partial<Room>) {
    return this.http.put<ListResponseModel<Room>>(`${this.baseUrl}/update`, room );
  }


}
