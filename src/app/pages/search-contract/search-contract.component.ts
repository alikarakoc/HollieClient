import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Agency, Board, Contract, Currency, Hotel, Market, RoomType } from "src/app/interfaces";
import { AgencyService, BoardService, ContractService, CurrencyService, HotelService, MarketService, RoomTypeService } from "src/app/services";
import { ExcelService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end"];
  dataSource: MatTableDataSource<Contract>;

  @ViewChild(MatTable) table: MatTable<SearchContractComponent>;

  startDate?: Date;
  endDate?: Date;
  people?: number;
  hotelIds: number[];

  constructor(
    private hotelService: HotelService,
    private contractService: ContractService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private excelService: ExcelService
  ) { }

  hotels: Hotel[] = [];
  contracts: Contract[] = [];
  agencies: Agency[] = [];
  markets: Market[] = [];
  boards: Board[] = [];
  roomTypes: RoomType[] = [];
  currencies: Currency[] = [];
  result: Contract[] = [];

  clearTable() {
    this.result = [];
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      this.agencies = res.data;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;
    });

    this.currencyService.getAllCurrency().subscribe(res => {
      this.currencies = res.data;
    });

    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });

    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
    });
  }

  applyFilter() {
    // console.log(this.startDate?.getTime(), this.endDate?.getTime());
    const dateConditions = (startDate: Date, endDate: Date): boolean => (this.startDate !== undefined && this.startDate?.getTime() <= startDate.getTime()) && (this.endDate !== undefined && this.endDate?.getTime() >= endDate.getTime());

    for (const contract of this.contracts) {
      if (dateConditions(this.toDate(contract.enteredDate), this.toDate(contract.exitDate))) {
        if (this.hotelIds.some(hI => hI === contract.hotelId)) {
          this.result.push(contract);
        }
      }
    }
    this.table.renderRows();

    // console.log(this.hotelIds);

    console.log(this.result);
  }

  clearInputs() {
  }

  toDate(v: Date | string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return element.agencyIds.map(i => this.agencies.find(a => a.id === i));
        return element.agencyIds;

      case 'board':
        // return element.boardIds.map(i => this.boards.find(b => b.id === i));
        return element.boardIds;

      case 'room_type':
        // return element.roomTypeIds.map(i => this.roomTypes.find(r => r.id === i));
        return element.roomTypeIds;

      case 'market':
        // return element.marketIds.map(i => this.markets.find(m => m.id === i));
        return element.marketIds;

      case 'hotel':
        // return this.hotels.find(h => h.id === element.hotelId)?.name;
        return element.hotelId;

      case 'currency':
        // return this.currencies.find(c => c.id === element.currencyId)?.name;
        return element.currencyId;
    }
  }
}
