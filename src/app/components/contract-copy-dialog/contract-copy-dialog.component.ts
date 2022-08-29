import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { Agency, Contract } from 'src/app/interfaces';
import { HotelService, ContractService, MarketService } from 'src/app/services';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CAgency } from 'src/app/interfaces/cagency';
import { CBoard } from 'src/app/interfaces/cboard';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { AMarketService } from 'src/app/services/amarket.service';

interface DialogData {
  element: Contract;
  table: MatTable<Contract>;
  dialogRef: MatDialogRef<any>;
  hotels: any[];
  markets: any[];
  rooms: any[];
  agencies: any[];
  boards: any[];
  currencies: any[];
  hotelCategories: any[];
  roomTypes: any[];
  cMarkets: any[];
  cAgencies: any[];
  cBoards: any[];
  cRoomTypes: any[];
  marketAgency: any[];

}
@Component({
  selector: 'app-contract-copy-dialog',
  templateUrl: './contract-copy-dialog.component.html',
  styleUrls: ['./contract-copy-dialog.component.scss']
})
export class ContractCopyDialogComponent implements OnInit {

  contract = this.data.element;
  id = this.data.element.id;
  code: string;
  name: string = this.data.element.name;
  start: Date = this.data.element.enteredDate;
  end: Date = this.data.element.exitDate;
  hotel: number = this.data.element.hotelId;
  adultPrice: number = this.data.element.adp;
  currency: number = this.data.element.currencyId;
  childPrice1: number = this.data.element.cH1;
  childPrice2: number = this.data.element.cH2;
  childPrice3: number = this.data.element.cH3;
  selectedAgencies: any[] = this.data.element.agencyList;
  selectedBoards: any[] = this.data.element.boardList;
  selectedMarkets: any[] = this.data.element.marketList;
  selectedRoomTypes: any[] = this.data.element.roomTypeList;
  hotelRoomTypes: any[] = [];

  constructor(
    public translocoService: TranslocoService,
    private dialogRef: MatDialogRef<ContractCopyDialogComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private marketService : MarketService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    //this.contract = this.data.element;
    this.markets = this.data.markets;
    this.rooms = this.data.rooms;
    this.agencies = this.data.agencies;
    this.boards = this.data.boards;
    this.roomTypes = this.data.roomTypes;
    this.hotels = this.data.hotels;
    this.currencies = this.data.currencies;
    this.marketAgency = this.data.marketAgency;
  }

  hotels: any[] = [];
  rooms: any[] = [];
  markets: any[] = [];
  categories: any[] = [];
  agencies: Agency[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  selectedValue: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets : any[] = [];
  //cRooms : any[] = [];
  cRoomTypes: any[] = []; 
  marketAgency: any[] = [];
  agencyID: any[] = [];
  commonAgencies: any[] = [];

  ngOnInit(): void {

    const idAgency = this.data.cAgencies.filter(cA => cA.listId === this.data.element.id).map(cA => cA.agencyId);
    this.selectedAgencies = idAgency;

    const idBoard = this.data.cBoards.filter(cB => cB.listId === this.data.element.id).map(cB => cB.boardId);
    this.selectedBoards= idBoard;

    const idMarket = this.data.cMarkets.filter(cM => cM.listId === this.data.element.id).map(cM => cM.marketId);
    this.selectedMarkets = idMarket;

    const idRoomType = this.data.cRoomTypes.filter(cR => cR.listId === this.data.element.id).map(cR => cR.roomTypeId);
    this.selectedRoomTypes = idRoomType;

    const roomTypeFilterhotel = this.data.roomTypes.filter(r => r.hotelId === this.data.element.hotelId);
    this.roomTypes = roomTypeFilterhotel;

  }
  contracts: Contract[] = [];
  onChangeHotel(event: any) {
    const roomTypeFilterhotel = this.data.roomTypes.filter(r => r.hotelId === event);
    this.roomTypes = roomTypeFilterhotel;
    this.hotelRoomTypes = [];
    for (let i = 0; i < this.roomTypes.length; i++) {
      if (this.roomTypes[i].hotelId == this.hotel) {
        this.hotelRoomTypes.push(this.roomTypes[i]);
      }
    }
  }

  getAgency(selectMark : any[], markAgency : any[]){
    for(let i = 0; i < selectMark.length; i++){
      let index = markAgency.findIndex(m => m.marketId == selectMark[i]);
    
      for(let a =0 ; a < markAgency[index].agencies.length; a++){
        let agencyid : number = markAgency[index].agencies[a];
        this.agencyID.push(agencyid);
      }
    }
    for (let x = 0; x < this.agencyID.length; x++) {
      var count : Number = this.agencyID.filter(y => y == this.agencyID[x]).length;
      if(count == selectMark.length){
        if(this.commonAgencies.length == 0){
          this.commonAgencies.push(this.agencyID[x]);
        }
        else if(!this.commonAgencies.includes(this.agencyID[x])){
          this.commonAgencies.push(this.agencyID[x]);
        }
      }
    }

    for (let x = 0; x < this.commonAgencies.length; x++) {
      var pureAgency = this.agencies.find(a => a.id == this.commonAgencies[x]);
      this.commonAgencies[x] = pureAgency;
    }
  }

  onChangeMarket(event: any){
    this.agencyID = [];
    this.commonAgencies = [];
    
    this.getAgency(this.selectedMarkets, this.marketAgency);

    if(this.selectedAgencies != null){
      for(let i = 0; i < this.selectedAgencies.length; i++){
        const agency : CAgency = {
          agencyId: 0
        };
        agency.agencyId = +this.selectedAgencies[i];
        this.selectedAgencies[i] = agency;
       };
    }

  
  }

  copy(){

    if(this.code == this.data.element.code){
      this.snackBar.open(this.translocoService.translate('dialogs.error_same'), "OK");
    }
    if (!this.code || !this.name || !this.end || !this.start ) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    if (this.start > this.end) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }

    const otherContracts = this.contracts.filter(c =>
      //c.code !== this.code &&
      c.name !== this.name &&
      c.hotelId !== this.hotel &&
      c.currencyId !== this.currency &&
      c.enteredDate !== this.start &&
      c.exitDate !== this.end);
    if (otherContracts.some(c =>
     // c.code === this.code &&
      c.name === this.name &&

      c.hotelId === this.hotel &&
      c.currencyId === this.currency)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'kontrakt' }), "OK");
       // this.code = "";
        this.name = "";
        this.start == null,
        this.end == null,
        this.hotel == null;
        this.currency == null;
        return;

    }

    for(let i = 0; i < this.selectedAgencies.length; i++){
      const agency : CAgency = {
        agencyId: 0
      } ;
      agency.agencyId = this.selectedAgencies[i];
      this.selectedAgencies[i] = agency;
     };


     for(let i = 0; i < this.selectedBoards.length; i++){
      const board : CBoard = {
       boardId: 0
      };
      board.boardId = this.selectedBoards[i];
      this.selectedBoards[i] = board;
     };


     for(let i = 0; i < this.selectedMarkets.length; i++){
      const market : CMarket = {
        marketId: 0
      };
      market.marketId = this.selectedMarkets[i];
      this.selectedMarkets[i] = market;
     };

     for(let i = 0; i < this.selectedRoomTypes.length; i++){
      const roomType : CRoomType = {
        roomTypeId: 0
      };
      roomType.roomTypeId = this.selectedRoomTypes[i];
      this.selectedRoomTypes[i] = roomType;
     };

    
     this.closeDialog();
     //this.data.table.renderRows();
  }

  closeDialog(){
    this.dialogRef.close({
      isAdded: true,
      element:{
        code: this.code,
        name: this.name,
        adp: this.adultPrice,
        childPrice: this.childPrice1,
        enteredDate: this.start,
        exitDate: this.end,
        ch1: this.childPrice1,
        ch2: this.childPrice2,
        ch3: this.childPrice3,
        hotelId: this.hotel,
        currencyId: this.currency,
        agencyList: this.selectedAgencies,
        boardList: this.selectedBoards,
        marketList: this.selectedMarkets,
        roomTypeList: this.selectedRoomTypes,
        createdUser : localStorage.getItem("username")
      }
      });
  }

}
