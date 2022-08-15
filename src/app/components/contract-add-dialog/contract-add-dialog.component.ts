import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, AgencyService, BoardService, RoomTypeService, CurrencyService } from 'src/app/services';
import { RoomService } from 'src/app/services/room.service';
import { CAgencyService } from 'src/app/services/cagency.service';
import { CAgency } from 'src/app/interfaces/cagency';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CRoom } from 'src/app/interfaces/croom';
import { CBoard } from 'src/app/interfaces/cboard';
import { CBoardService } from 'src/app/services/cboard.service';
import { CMarketService } from 'src/app/services/cmarket.service';
import { CRoomService } from 'src/app/services/croom.service';


interface DialogData {
  table: MatTable<Contract>;
}

@Component({
  selector: 'app-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})
export class ContractAddDialogComponent implements OnInit {
  // NgModels :)
  contractCode: string;
  name: string;
  price: number;
  adp:number;
  childPrice:number;
  start: Date;
  end: Date;
  hotel: number;
  selectedMarkets: CMarket[];
  selectedAgencies: CAgency[];
  selectedBoards: CBoard[];
  selectedRoomTypes: CRoomType[];
  selectedRooms: CRoom[];
  currency: number;
  listId: number;
  contractId: number;
  contDay :number;
  ch07: number;
  ch14: number;

  constructor(
    public translocoService: TranslocoService,
    private dialogRef: MatDialogRef<ContractAddDialogComponent>,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
    private marketService: MarketService,
    private roomService: RoomService,
    private agencyService: AgencyService,
    private cagencyService: CAgencyService,
    private cboardService: CBoardService,
    private croomService: CRoomService,
    private cmarketService: CMarketService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private contractService: ContractService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  myFilter = (d: Date | null): boolean => {
    let dun = new Date();
    dun.setDate(dun.getDate()-1);
    const day = (d || (dun).getDate());
    return d!>(dun);
  };

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  rooms: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  contracts: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets : any[] =[];
  cRooms : any[] =[];
  cRoomTypes: any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });

    this.marketService.getAllMarkets().subscribe(res => {
      if (res.data !== null) this.markets = res.data;
      else this.markets = [];
    });

    this.roomService.getAllRooms().subscribe(res => {
      if (res.data !== null) this.rooms = res.data;
      else this.rooms = [];
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
      else this.currencies = []
    });

    this.boardService.getAllBoards().subscribe(res => {
      if (res.data !== null) this.boards = res.data;
      else this.boards = []
    });

    this.contractService.getAllContracts().subscribe(res => {
      if (res.data !== null) this.contracts = res.data;
      else this.contracts = [];
    });

    this.cagencyService.getAllCAgencies().subscribe(res => {
      if (res.data !== null) this.cAgencies = res.data;
      else this.cAgencies = [];
    });

    this.cboardService.getAllCBoards().subscribe(res => {
      if (res.data !== null) this.cBoards = res.data;
      else this.cBoards = [];
    });

    this.croomService.getAllCRooms().subscribe(res => {
      if (res.data !== null) this.cRooms = res.data;
      else this.cRooms = [];
    });

    this.cmarketService.getAllCMarkets().subscribe(res => {
      if (res.data !== null) this.cMarkets = res.data;
      else this.cMarkets = [];
    });
  }

  add() {
    this.contractService.getAllContracts().subscribe((res) => {
      if (res.data.some(c => c.code === this.contractCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'sözleşme' }), "OK");
        this.contractCode = "";
        return;
      }
    });

    if (this.start > this.end) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.name }));

    
    this.closeDialog();
    this.data.table.renderRows();
    console.log(this.hotel);
  }


  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.contractCode,
        name: this.name,
        adp: this.adp,
        childPrice: this.childPrice,
        enteredDate: this.start,
        exitDate: this.end,
        ch07:this.ch07,
        ch14:this.ch14,
        hotelId: this.hotel,
        currencyId: this.currency,
        agencyList: this.selectedAgencies,
        boardList: this.selectedBoards,
        marketList: this.selectedMarkets,
        roomList: this.selectedRooms,
        roomTypeList: this.selectedRoomTypes
      }
    });

  }
}
