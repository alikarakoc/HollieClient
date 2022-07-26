import { Component, OnInit } from '@angular/core';
import { Contract, Hotel } from "src/app/interfaces";
import { HotelService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  // -- ÖRNEK VERİ -- ÖRNEK VERİ -- ÖRNEK VERİ -- ÖRNEK VERİ --
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end"];
  results: Contract[] = [
    {
      name: "Example",
      price: 300,
      code: "EXAM",
      enteredDate: new Date(2022, 6, 20),
      exitDate: new Date(2022, 7, 1),
      agencyIds: [1, 2],
      boardIds: [1],
      categoryIds: [1],
      marketIds: [1],
      roomTypeIds: [1],
      currencyId: 1,
      hotelId: 1
    },
    {
      name: "2. Example",
      price: 10000,
      code: "EX2M",
      enteredDate: new Date(2022, 7, 20),
      exitDate: new Date(2022, 7, 23),
      agencyIds: [2],
      boardIds: [1],
      categoryIds: [1],
      marketIds: [1],
      roomTypeIds: [1],
      currencyId: 1,
      hotelId: 1
    },
  ];

  constructor(
    private hotelService: HotelService
  ) { }

  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });
  }

  toDate(v: string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return this.agencies.find(a => a.id === element.agencyId)?.name;
        return element.agencyIds;

      case 'board':
        // return this.boards.find(a => a.id === element.boardId)?.name;
        return element.boardIds;

      case 'room_type':
        return element.roomTypeIds;
        // return this.roomTypes.find(a => a.id === element.roomTypeId)?.name;

      case 'market':
        return element.marketIds;
        // return this.markets.find(a => a.id === element.marketId)?.name;

      case 'hotel':
        return element.hotelId;
        // return this.hotels.find(a => a.id === element.hotelId)?.name;

      case 'currency':
        // return this.currencies.find(a => a.id === element.currencyId)?.name;
        return element.currencyId;
    }
  }
}
