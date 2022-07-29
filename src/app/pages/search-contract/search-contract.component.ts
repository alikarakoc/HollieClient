import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { Contract, Hotel } from "src/app/interfaces";
import { ContractService, HotelService, ExcelService, CBoardService, CAgencyService, CMarketService, CRoomTypeService, RoomTypeService, AgencyService, BoardService, CurrencyService, MarketService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end","Total-Price"];
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
    private cAgencyService: CAgencyService,
    private cBoardService: CBoardService,
    private cMarketService: CMarketService,
    private cRoomTypeService: CRoomTypeService,
    private excelService: ExcelService,
    private translocoService: TranslocoService,
    private snackBar: MatSnackBar
  ) { }

  hotels: Hotel[] = [];
  contracts: Contract[] = [];
  result: Contract[] = [];

  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];

  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];

  clearTable() {
    this.result = [];
    this.table.renderRows();
  }

  exportAsXLSX(): void {
    const arrayToExport = this.result.map(c => {
      return {
        code: c.code,
        name: c.name,
        price: c.price,
        currency: this.getItem('currency', c),
        hotels: this.getItem('hotel', c),
        markets: this.getItem('market', c).toString(),
        agencies: this.getItem('agency', c).toString(),
        boards: this.getItem('board', c).toString(),
        roomTypes: this.getItem('room_type', c).toString(),
        startDate: c.enteredDate,
        endDate: c.exitDate
      }
    });
    this.excelService.exportAsExcelFile(arrayToExport, 'Contracts_Filtered');
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });

    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
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

    this.cAgencyService.getAllCAgencies().subscribe(res => {
      this.cAgencies = res.data;
    });

    this.cBoardService.getAllCBoards().subscribe(res => {
      this.cMarkets = res.data;
    });

    this.cMarketService.getAllCMarkets().subscribe(res => {
      this.cMarkets = res.data;
    });

    this.cRoomTypeService.getAllCRoomTypes().subscribe(res => {
      this.cRoomTypes = res.data;
    })
  }

  applyFilter() {
    this.clearTable();
    // console.log(this.startDate?.getTime(), this.endDate?.getTime());
    const dateConditions = (startDate: Date, endDate: Date): boolean => (this.startDate !== undefined && this.startDate?.getTime() <= startDate.getTime()) && (this.endDate !== undefined && this.endDate?.getTime() >= endDate.getTime());

    if (this.startDate! > this.endDate!) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }

    for (const contract of this.contracts) {
      if (dateConditions(this.toDate(contract.enteredDate), this.toDate(contract.exitDate))) {
        if (!this.hotelIds || this.hotelIds.length === 0) this.hotelIds = this.hotels.map(h => h.id!);
        if (this.hotelIds.some(hI => hI === contract.hotelId)) {
          this.result.push(contract);
        }
      }
    }
    this.table.renderRows();

    console.log(this.hotelIds);

    if (this.result.length === 0) {
      this.snackBar.open(this.translocoService.translate('contract_not_found'));
    }

    // console.log(this.result);
  }

  clearInputs() {
  }

  toDate(v: Date | string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract): any[] | any {
    switch (type) {
      case 'agency':
        // return element.agencyIds.map(i => this.agencies.find(a => a.id === i));
        const idAgency = this.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        // return element.boardIds.map(i => this.boards.find(b => b.id === i));
        const idBoard = this.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

      case 'room_type':
        // return element.roomTypeIds.map(i => this.roomTypes.find(r => r.id === i));
        const idRoom = this.cRoomTypes.filter(cR => cR.listId === element.id).map(cR => cR.roomTypeId);
        return idRoom.map(i => this.roomTypes.find(r => r.id === i).name);

      case 'market':
        // return element.marketIds.map(i => this.markets.find(m => m.id === i));
        const idMarket = this.cMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);

      case 'hotel':
        return this.hotels.find(h => h.id === element.hotelId)?.name;

      case 'currency':
        return this.currencies.find(c => c.id === element.currencyId)?.name;
    }
  }
}
