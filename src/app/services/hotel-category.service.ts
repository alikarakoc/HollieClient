import { Injectable } from '@angular/core';
import { HotelCategory } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class HotelCategoryService {
  categories: HotelCategory[] = [
    {
      code: "1",
      name: "Resort Hotel"
    },
    {
      code: "2",
      name: "City Hotel"
    },
    {
      code: "3",
      name: "B&B"
    }
  ];

  constructor() { }
}
