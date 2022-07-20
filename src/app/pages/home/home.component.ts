import { Component, OnInit } from '@angular/core';
import { CountryService, HotelCategoryService, HotelService, RoomTypeService } from "src/app/services";
import { AgencyService } from "src/app/services/agency.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public countryService: CountryService,
    public roomTypeService: RoomTypeService,
    public agencyService: AgencyService,
    public hotelCategoryService: HotelCategoryService,
    public hotelService: HotelService
  ) { }

  countries: any[] = [];
  roomTypes: any[] = [];
  agencies = [];
  hotelCategories: any[] = [];
  hotels: any[] = [];

  ngOnInit(): void {
    this.roomTypeService.getAllRoomTypes().subscribe((res) => {
      this.roomTypes = res.data;
    });

    this.hotelCategoryService.getAllHotels().subscribe((res) => {
      this.hotelCategories = res.data;
    });
  }

}
