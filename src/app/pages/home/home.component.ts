import { Component, OnInit } from '@angular/core';
import { CountryService, HotelCategoryService, HotelService, MarketService, RoomTypeService } from "src/app/services";
import { AgencyService } from "src/app/services/agency.service";
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public agencyService: AgencyService,
    public boardService: BoardService,
    public countryService: CountryService,
    public hotelService: HotelService,
    public hotelCategoryService: HotelCategoryService,
    public marketService:  MarketService,
    public roomTypeService: RoomTypeService
  ) { }

  agencies: any[] = [];
  boards: any[] = [];
  countries: any[] = [];
  hotels: any[] = [];
  hotelCategories: any[] = [];
  markets: any[] = [];
  roomTypes: any[] = [];
  
  
  ngOnInit(): void {
   
    this.agencyService.getAllAgencies().subscribe((res) => {
      this.agencies = res.data;
    });

    this.boardService.getAllBoards().subscribe((res) => {
      this.boards = res.data;
    });
   
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res.data;
    });

    this.hotelService.getAllHotels().subscribe((res) => {
      this.hotels = res.data;
    });

    this.hotelCategoryService.getAllHotels().subscribe((res) => {
      this.hotelCategories = res.data;
    });

   this.marketService.getAllMarkets().subscribe((res) => {
    this.markets = res.data;
   })

   this.roomTypeService.getAllRoomTypes().subscribe((res) => {
    this.roomTypes = res.data;
  });
  }

}
