import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { AgencyService, BoardService, CurrencyService, HotelCategoryService, HotelService, MarketService, RoomTypeService } from "src/app/services";

interface DialogData {
  table: MatTable<any>;
}

@Component({
  selector: 'app-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})
export class ContractAddDialogComponent implements OnInit {
  // NgModels :)
  code: string;
  name: string;
  price: number;
  start: Date;
  end: Date;
  hotelId: number;
  marketId: number;
  categoryId: number;
  agencyId: number;
  boardId: number;
  roomTypeId: number;
  currencyId: number;

  constructor(
    public translocoService: TranslocoService,
    private hotelService: HotelService,
    private marketService: MarketService,
    private hotelCategoryService: HotelCategoryService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  categories: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.categories = res.data;
    });

    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      this.agencies = res.data;
    });

    // TODO: Github'dan pull ettikten sonra yorumu kaldır
    // this.currencyService.getAllCurrency().subscribe(res => {
    //   this.currencies = res.data;
    // });
  }

  add() { }

  closeDialog() { }

}
