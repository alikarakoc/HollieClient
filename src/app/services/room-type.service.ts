import { Injectable } from '@angular/core';
import { RoomType } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  // TODO: şimdilik array içinde olacak
  rooms: RoomType[] = [
    {
      name: "Suite",
      code: "1"
    },
    {
      name: "Family",
      code: "2"
    },
    {
      name: "Single",
      code: "3"
    }
  ];

  constructor() { }

  addRoomType(type: RoomType) {
  }

  deleteRoomType(roomType: RoomType) {
  }
}
