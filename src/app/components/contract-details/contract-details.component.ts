import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contract } from "src/app/interfaces";
import { AgencyService, BoardService, CAgencyService, CBoardService, CMarketService, CRoomTypeService, CurrencyService, HotelCategoryService, HotelService, MarketService, RoomTypeService } from "src/app/services";

interface DialogData {
  contract: Contract;
}

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  contract: Contract;

  constructor(
    private agencyService: AgencyService,
    private boardService: BoardService,
    private currencyService: CurrencyService,
    private hotelService: HotelService,
    private hotelCategoryService: HotelCategoryService,
    private marketService: MarketService,
    private roomTypeService: RoomTypeService,
    private cAgencyService: CAgencyService,
    private cBoardService: CBoardService,
    private cMarketService: CMarketService,
    private cRoomTypeService: CRoomTypeService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.contract = this.data.contract;
  }

  agencies: any[] = [];
  boards: any[] = [];
  currencies: any[] = [];
  hotels: any[] = [];
  hotelCategories: any[] = [];
  markets: any[] = [];
  roomTypes: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];

  toDate(v: string | Date): Date {
    return new Date(v);
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });

    this.marketService.getAllMarkets().subscribe(res => {
      if (res.data !== null) this.markets = res.data;
      else this.markets = [];
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      if (res.data !== null) this.agencies = res.data;
      else this.agencies = [];
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      if (res.data !== null) this.roomTypes = res.data;
      else this.roomTypes = [];
    });

    this.currencyService.getAllCurrency().subscribe(res => {
      if (res.data !== null) this.currencies = res.data;
      else this.currencies = [];
    });

    this.boardService.getAllBoards().subscribe(res => {
      if (res.data !== null) this.boards = res.data;
      else this.boards = [];
    });

    this.cAgencyService.getAllCAgencies().subscribe(res => {
      if (res.data !== null) this.cAgencies = res.data;
      else this.cAgencies = [];
    });

    this.cBoardService.getAllCBoards().subscribe(res => {
      if (res.data !== null) this.cBoards = res.data;
      else this.cBoards = [];
    });

    this.cRoomTypeService.getAllCRoomTypes().subscribe(res => {
      if (res.data !== null) this.cRoomTypes = res.data;
      else this.cRoomTypes = [];
    });

    this.cMarketService.getAllCMarkets().subscribe(res => {
      if (res.data !== null) this.cMarkets = res.data;
      else this.cMarkets = [];
    });
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency") {
    const element = this.contract;
    switch (type) {
      case 'agency':
        const idAgency = this.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        const idBoard = this.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

      case 'room_type':
        const idRoom = this.cRoomTypes.filter(cR => cR.listId === element.id).map(cR => cR.roomTypeId);
        return idRoom.map(i => this.roomTypes.find(r => r.id === i).name);

      case 'market':
        const idMarket = this.cMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);

      case 'hotel':
        return element.hotelId;

      case 'currency':
        return this.currencies.find(c => c.id === element.currencyId)!.code;
    }

  }
}