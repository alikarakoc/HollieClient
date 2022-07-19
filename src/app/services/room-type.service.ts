import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RoomType } from "../interfaces";
import { ListResponseModel } from "../interfaces/listResponseModel";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  // TODO: şimdilik array içinde olacak
  rooms: RoomType[] = [];
  baseUrl = `${environment.baseUrl}/RoomType`;

  constructor(private httpClient: HttpClient) { }

  getAllRoomTypes(): Observable<ListResponseModel<RoomType>> {
    return this.httpClient.get<ListResponseModel<RoomType>>(`${this.baseUrl}/AllRoomTypes`);
  }

  addRoomType(roomType: Partial<RoomType>) {
    return this.httpClient.post<ListResponseModel<RoomType>>(`${this.baseUrl}/AddRoomType`, roomType);
  }

  deleteRoomType(roomType: Partial<RoomType>) {
    return this.httpClient.delete<ListResponseModel<RoomType>>(`${this.baseUrl}/DeleteRoomType?Id=${roomType.id}`)
  }

  updateRoomType(roomType: Partial<RoomType>) {
    return this.httpClient.put<ListResponseModel<RoomType>>(`${this.baseUrl}/UpdateRoomType?Id=${roomType.id}`, roomType);
  }
}
