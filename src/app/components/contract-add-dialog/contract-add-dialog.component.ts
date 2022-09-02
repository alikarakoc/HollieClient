import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { TranslocoService } from '@ngneat/transloco';
import { Agency, Contract } from 'src/app/interfaces';
import { CAgency } from 'src/app/interfaces/cagency';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CBoard } from 'src/app/interfaces/cboard';
import { AMarketService } from 'src/app/services/amarket.service';
import { MarketService } from 'src/app/services';
import { FormGroup,FormControl, Validators, ValidationErrors } from '@angular/forms';


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
  marketAgency: any[];

}

@Component({
  selector: 'app-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})
export class ContractAddDialogComponent implements OnInit {
  // NgModels :)
  contractCode: string ;
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
    private marketService: MarketService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.markets = this.data.markets;
    //this.rooms = this.data.rooms;
    this.agencies = this.data.agencies;
    this.boards = this.data.boards;
    this.roomTypes = this.data.roomTypes;
    this.hotels = this.data.hotels;
    this.currencies = this.data.currencies;
    this.marketAgency = this.data.marketAgency;
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
  marketAgency: any[] = [];
  agencyID: any[] = [];
  commonAgencies: any[] = [];


  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data !== null) this.contracts = res.data;
      else this.contracts = [];
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
    this.agencyID = [];
    this.commonAgencies = [];
    for (let i = 0; i < this.selectedMarkets.length; i++) {
      let index = this.marketAgency.findIndex(m => m.marketId == this.selectedMarkets[i].marketId);
      for (let a = 0; a < this.marketAgency[index].agencies.length; a++) {
        let agencyid: number = this.marketAgency[index].agencies[a];
        this.agencyID.push(agencyid);
      }
    }
    for (let x = 0; x < this.agencyID.length; x++) {
      var count: Number = this.agencyID.filter(y => y == this.agencyID[x]).length;
      if (count == this.selectedMarkets.length) {
        if (this.commonAgencies.length == 0) {
          this.commonAgencies.push(this.agencyID[x]);
        }
        else if (!this.commonAgencies.includes(this.agencyID[x])) {
          this.commonAgencies.push(this.agencyID[x]);
        }
      }
    }

    for (let x = 0; x < this.commonAgencies.length; x++) {
      var pureAgency: Agency = this.agencies.find(a => a.id == this.commonAgencies[x]);
      this.commonAgencies[x] = pureAgency;
    }

    if (this.selectedAgencies != null) {
      for (let i = 0; i < this.selectedAgencies.length; i++) {
        const agency: CAgency = {
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

    if (!this.contractCode || !this.name || !this.adp ||  this.start === new Date(1 / 1 / 1) ||
      this.end === new Date(1 / 1 / 1) || !this.ch1 || !this.ch2  || !this.ch3  || !this.hotel || !this.currency ||
      this.selectedAgencies == undefined || this.selectedBoards == undefined || this.selectedMarkets == undefined || this.selectedRoomTypes == undefined) {

      this.snackBar.open(this.translocoService.translate('dialogs.error_required', { elementName: this.name }));
      return;
    }

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
        roomTypeList: this.selectedRoomTypes,
        createdUser: localStorage.getItem("username")
      }
    });

  }
}
