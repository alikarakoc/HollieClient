import { Component, OnInit } from '@angular/core';
import { Hotel } from "src/app/interfaces";
import { HotelService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {

  constructor(
    private hotelService: HotelService
  ) { }

  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });
  }

}
