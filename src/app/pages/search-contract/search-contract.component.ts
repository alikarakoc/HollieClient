import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { ContractDetailsComponent } from 'src/app/components';
import { Contract, Hotel } from "src/app/interfaces";
import { ContractService, HotelService, ExcelService, CBoardService, CAgencyService, CMarketService, RoomTypeService, AgencyService, BoardService, CurrencyService, MarketService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  columns: string[] = ["code", "name", "hotel", "start", "end", "Total-Price", "seeDetails"];
  dataSource: MatTableDataSource<Contract>;

  @ViewChild(MatTable) table: MatTable<SearchContractComponent>;

  startDate?: Date;
  endDate?: Date;
  adult?: number;
  child?: number;
  hotelIds: number[];
  totalPrice: number;

  constructor(
    private hotelService: HotelService,
    private dialog: MatDialog,
    private contractService: ContractService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private cAgencyService: CAgencyService,
    private cBoardService: CBoardService,
    private cMarketService: CMarketService,
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

  
  clear(){
    this.ngOnInit();
  }

  exportAsXLSX(): void {
    const arrayToExport = this.result.map(c => {
      return {
        code: c.code,
        name: c.name,
        adultPrice: c.adultPrice,
        childPrice:c.childPrice,
        currency: this.getItem('currency', c),
        hotels: this.getItem('hotel', c),
        markets: this.getItem('market', c).toString(),
        agencies: this.getItem('agency', c).toString(),
        boards: this.getItem('board', c).toString(),
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
      this.cBoards = res.data;
    });

    this.cMarketService.getAllCMarkets().subscribe(res => {
      this.cMarkets = res.data;
    });
 
  }


  applyFilter() {
    this.clearTable();

    if (this.startDate! > this.endDate!) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }
    console.log(this.adult+"   "+this.child );


    for (const contract of this.contracts) {

      const enterC: Date = this.toDate(contract.enteredDate);
      const exitC: Date = this.toDate(contract.exitDate);

      if (this.startDate !== undefined && this.endDate !== undefined) {
        const start: Date = this.startDate;
        const end: Date = this.endDate;
        //if((start <= enterC && end >= exitC) || (enterC < start && exitC < end) || (enterC > start && exitC > end) || (enterC < start && exitC > end) ){
        if (this.hotelIds != null && this.hotelIds.includes(contract.hotelId) || this.hotelIds == null) {
          if (start <= enterC && end >= exitC) {
            this.result.push(contract);
          }
          else if (enterC <= start && exitC <= end && !(exitC <= start)) {
            this.result.push(contract);
          }
          else if (enterC >= start && exitC >= end && enterC <= end) {
            this.result.push(contract);
          }
          else if (enterC <= start && exitC >= end) {
            this.result.push(contract);
          }
          else {
          }
        }
      };

    }
    this.table.renderRows();

    if (this.result.length === 0) {
      this.snackBar.open(this.translocoService.translate('contract_not_found'));
    }
  }

  clearInputs() {
  }

  seeDetails(element: Contract) {

    this.dialog.open(ContractDetailsComponent, {
      data: {
        contract: element, roomTypes: this.roomTypes, hotels: this.hotels,
        markets: this.markets, agencies: this.agencies, currencies: this.currencies,
        boards: this.boards, cAgencies: this.cAgencies, cBoards: this.cBoards,
        cMarkets: this.cMarkets
      }
    });

  }

  toDate(v: Date | string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "market" | "hotel" | "currency", element: Contract): any[] | any {
    switch (type) {
      case 'agency':
        // return element.agencyIds.map(i => this.agencies.find(a => a.id === i));
        const idAgency = this.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        // return element.boardIds.map(i => this.boards.find(b => b.id === i));
        const idBoard = this.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

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
