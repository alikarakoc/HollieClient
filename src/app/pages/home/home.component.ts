import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { map, Observable, shareReplay } from "rxjs";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Agency, Board, Contract, Country, Currency, Hotel, HotelCategory, Market, RoomType, Room } from "src/app/interfaces";
import { ContractService, CountryService, CurrencyService, HotelCategoryService, HotelService, MarketService, RoomTypeService } from "src/app/services";
import { AgencyService } from "src/app/services/agency.service";
import { BoardService } from 'src/app/services/board.service';
import { RoomService } from "src/app/services/room.service";

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
    public marketService: MarketService,
    public roomTypeService: RoomTypeService,
    public contractService: ContractService,
    public currencyService: CurrencyService,
    public roomService: RoomService,
    private breakpointObserver: BreakpointObserver
  ) { }

  agencies: Agency[] = [];
  boards: Board[] = [];
  countries: Country[] = [];
  hotels: Hotel[] = [];
  hotelCategories: HotelCategory[] = [];
  markets: Market[] = [];
  roomTypes: RoomType[] = [];
  contracts: Contract[] = [];
  currencies: Currency[] = [];
  rooms: Room[] = [];
  notAvailabel: number;


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
    });

    this.roomTypeService.getAllRoomTypes().subscribe((res) => {
      this.roomTypes = res.data;
    });

    this.contractService.getAllContracts().subscribe((res) => {
      this.contracts = res.data;
    });

    this.currencyService.getAllCurrency().subscribe((res) => {
      this.currencies = res.data;
    });
    this.roomService.getAllRooms().subscribe((res)=> {
      this.rooms=res.data;
    });
  }
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

Length(){
  this.notAvailabel = this.rooms.filter(f => f.reservation == true).length;
  alert(this.notAvailabel);
}





  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
