import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { TranslocoService } from '@ngneat/transloco';
import { Agency, Contract } from 'src/app/interfaces';
import { HotelService, MarketService, AgencyService, BoardService, RoomTypeService, CurrencyService } from 'src/app/services';
import { RoomService } from 'src/app/services/room.service';
import { CAgencyService } from 'src/app/services/cagency.service';
import { CAgency } from 'src/app/interfaces/cagency';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CBoard } from 'src/app/interfaces/cboard';
import { CBoardService } from 'src/app/services/cboard.service';
import { CMarketService } from 'src/app/services/cmarket.service';
import { CRoomTypeService } from 'src/app/services/croomtype.service';
import { AMarket } from 'src/app/interfaces/amarket';
import { AMarketService } from 'src/app/services/amarket.service';


interface DialogData {
  table: MatTable<Contract>;
  dialogRef: MatDialogRef<any>;
  hotels: any[];
  markets: any[];
  //rooms: any[];
  agencies: any[];
  boards: any[];
  currencies: any[];
  hotelCategories: any[];
  roomTypes: any[];
  cMarkets: any[];
  //cRooms: any[];
  cAgencies: any[];
  cBoards: any[];
  cRoomTypes: any[];
  agencyMarkets: any[];

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
  adp: number;
  childPrice: number;
  start: Date;
  end: Date;
  hotel: number;
  selectedMarkets: CMarket[];
  selectedAgencies: CAgency[];
  selectedBoards: CBoard[];
  selectedRoomTypes: CRoomType[];
  hotelRoomTypes: any[] = [];
  marketAgencies: any[] = [];
  //selectedRooms: CRoom[];
  currency: number;
  listId: number;
  contractId: number;
  contDay: number;
  ch1: number;
  ch2: number;
  ch3: number;

  constructor(
    public translocoService: TranslocoService,
    private dialogRef: MatDialogRef<ContractAddDialogComponent>,
    private snackBar: MatSnackBar,
    private contractService: ContractService,
    private agencyMarketService: AMarketService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.markets = this.data.markets;
    //this.rooms = this.data.rooms;
    this.agencies = this.data.agencies;
    this.boards = this.data.boards;
    this.roomTypes = this.data.roomTypes;
    this.hotels = this.data.hotels;
    this.currencies = this.data.currencies;
    //this.agencyMarkets = this.agencyMarkets;
  }

  myFilter = (d: Date | null): boolean => {
    let dun = new Date();
    dun.setDate(dun.getDate() - 1);
    const day = (d || (dun).getDate());
    return d! > (dun);
  };

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  //rooms: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  contracts: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  //cRooms : any[] =[];
  cRoomTypes: any[] = [];
  agencyMarkets: any[] = [];



  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data !== null) this.contracts = res.data;
      else this.contracts = [];
    });

    this.agencyMarketService.getAllAMarkets().subscribe(res => {
      if (res.data != null) {
        this.agencyMarkets = res.data;
      }
    });
  }

  onChangeHotel(event: any) {
    this.hotelRoomTypes = [];
    for (let i = 0; i < this.roomTypes.length; i++) {
      if (this.roomTypes[i].hotelId == this.hotel) {
        this.hotelRoomTypes.push(this.roomTypes[i]);
      }
    }
  }

  onChangeMarket(event: any) {
    //DUZENLENECEK
    this.marketAgencies = [];
    if (this.selectedMarkets != null) {
      for (let i = 0; i < this.selectedMarkets.length; i++) {
        let tempA = [];
        const markets = this.agencyMarkets.filter(m => m.marketId === this.selectedMarkets[i].marketId).map(m => m.listId);
        let s = markets.map(i => this.agencies.find(a => a.id === i).id).toString();
        tempA = s.split(',', markets.length);

        for (let i = 0; i < tempA.length; i++) {
          var num: number = +tempA[i];
          if (this.marketAgencies.includes(num)) {
          }
          else {
            var num: number = +tempA[i];

            this.marketAgencies.push(num);
          };
        }
      }

      for (let x = 0; x < this.marketAgencies.length; x++) {
        var pureAgency: Agency = this.agencies.find(a => a.id == this.marketAgencies[x]);
        this.marketAgencies[x] = pureAgency;
      }
      for(let i = 0; i < this.selectedAgencies.length; i++){
        const agency : CAgency = {
          agencyId: 0
        };
        agency.agencyId = +this.selectedAgencies[i];
        this.selectedAgencies[i] = agency;
       };
    }
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
        ch1: this.ch1,
        ch2: this.ch2,
        ch3: this.ch3,
        hotelId: this.hotel,
        currencyId: this.currency,
        agencyList: this.selectedAgencies,
        boardList: this.selectedBoards,
        marketList: this.selectedMarkets,
        //roomList: this.selectedRooms,
        roomTypeList: this.selectedRoomTypes,
      }
    });

  }
}
