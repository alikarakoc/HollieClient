import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { ContractDetailsComponent } from 'src/app/components';
import { Contract, Hotel } from "src/app/interfaces";
import { CRoomTypeService } from 'src/app/services/croomtype.service';
import { RoomService } from 'src/app/services/room.service';
import { ContractService, HotelService, ExcelService, CBoardService, CAgencyService, CMarketService, RoomTypeService, AgencyService, BoardService, CurrencyService, MarketService } from "src/app/services";
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  columns: string[] = ["code", "name", "hotel", "adp", "cH1", "cH2", "cH3", "start", "end", "Total-Price", "seeDetails"];
  dataSource: MatTableDataSource<Contract>;

  @ViewChild(MatTable) table: MatTable<SearchContractComponent>;

  startDate?: Date;
  endDate?: Date;
  adult: number;
  adp?: number;
  gun: number;
  contDay?: number;
  child1: number;
  child2: number;
  child3: number;
  child?: number;
  hotelIds: number[];
  totalPrice: number = 0;

  constructor(
    private hotelService: HotelService,
    private dialog: MatDialog,
    private contractService: ContractService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private cAgencyService: CAgencyService,
    private cBoardService: CBoardService,
    private cMarketService: CMarketService,
    private excelService: ExcelService,
    private croomTypeService: CRoomTypeService,
    private translocoService: TranslocoService,
    private hotelFeatureService: HotelFeatureService,
    private snackBar: MatSnackBar
  ) { }

  contract: Contract;
  hotels: Hotel[] = [];
  contracts: Contract[] = [];
  result: Contract[] = [];
  rooms: any[] = [];
  cRooms: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  contDays?= (1);
  features: HotelFeature[] = [];
  contBabyTop: any;
  contChildTop: any;
  contTeenTop: any;
  contChildAges: any[] = [];



  clearTable() {
    this.result = [];
    this.table.renderRows();
  }


  clear() {
    this.ngOnInit();
  }

  exportAsXLSX(): void {
    const arrayToExport = this.result.map(c => {
      return {
        code: c.code,
        name: c.name,
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

    this.croomTypeService.getAllCRoomTypes().subscribe(res => {
      if (res.data != null) {
        this.cRoomTypes = res.data;
      }
    });

    this.hotelFeatureService.getAllFeatures().subscribe(res => {
      if (res.data != null) {
        this.features = res.data;
      }
    })

    this.roomService.getAllRooms().subscribe(res => {
      if (res.data != null) {
        this.rooms = res.data;
      }
    });
  }

  onChangeChild1(event: any) {
    console.log("child1: " + event);
  }

  onChangeChild2(event: any) {
    console.log("child2: " + event);
  }

  onChangeChild3(event: any) {
    console.log("child3: " + event);
  }


  applyFilter() {

    this.contChildAges=[];

    this.result = [];
    if (this.startDate! > this.endDate!) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }


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

      if (this.result.length === 0) {
        this.snackBar.open(this.translocoService.translate('contract_not_found'));
      }

      this.table.renderRows();
    }

    if (this.child1 != null) {
      this.contChildAges.push(this.child1);
    }
    if (this.child2 != null) {
      this.contChildAges.push(this.child2);
    }
    if (this.child3 != null) {
      this.contChildAges.push(this.child3);
    }

    // this.table.renderRows();

    for(let i=0; i < this.contChildAges.length; i++){
      console.log("child array"+this.contChildAges[i]);

    }

  }

  getCurrentTotalPrice(contract: Contract) {
    this.totalPrice = this.adult * contract.adp ;
    let s = this.hotels.find(c => c.id === contract.hotelId);
    this.contBabyTop = this.features.find(c => c.id === s?.hotelFeatureId)?.babyTop;
    this.contChildTop = this.features.find(c => c.id === s?.hotelFeatureId)?.childTop;
    this.contTeenTop = this.features.find(c => c.id === s?.hotelFeatureId)?.teenTop;
    // console.log(this.totalPrice+ ': total price 1');


    for (let c = 0; c < this.contChildAges.length; c++) {
      if (this.contChildAges[c] <= this.contBabyTop) {
        this.totalPrice = this.totalPrice + contract.cH1;
      }
      else if (this.contChildAges[c] <= this.contChildTop) {
        this.totalPrice = this.totalPrice + contract.cH2;
      }
      else if (this.contChildAges[c] <= this.contTeenTop) {
        this.totalPrice = this.totalPrice + contract.cH3;
      }
      else{
        this.totalPrice = this.totalPrice + contract.adp;
      }
      // console.log(this.totalPrice);

    }
    return this.totalPrice;
  }



  clearInputs() {
  }

  seeDetails(element: Contract) {

    this.dialog.open(ContractDetailsComponent, {
      data: {
        contract: element, roomTypes: this.roomTypes, hotels: this.hotels,
        markets: this.markets, agencies: this.agencies, currencies: this.currencies,
        boards: this.boards, cAgencies: this.cAgencies, cBoards: this.cBoards,
        cMarkets: this.cMarkets, cRooms: this.cRooms, rooms: this.rooms
      }
    });

  }

  toDate(v: Date | string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "market" | "date" | "room" | "hotel" | "currency", element: Contract): any[] | any {
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

      case 'room':
        const idRoom = this.cRooms.filter(cR => cR.listId === element.id).map(cR => cR.roomId);
        return idRoom.map(i => this.rooms.find(r => r.id === i).name);

      case 'date':
        this.gun = (-1 * (new Date(element.enteredDate).getTime() - new Date(element.exitDate).getTime()) / (1000 * 60 * 60 * 24));
        return this.gun


      // case 'room':
      // const idRoom = this.data.cRooms.filter(cR => cR.listId === element.id).map(cR => cR.);
      // return idRoom.map(i => this.rooms.find(r => r.id === i)?.name);

      case 'hotel':
        return this.hotels.find(h => h.id === element.hotelId)?.name;

      case 'currency':
        return this.currencies.find(c => c.id === element.currencyId)?.name;
    }
  }
}
