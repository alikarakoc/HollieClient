import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { ContractDeleteDialogComponent } from "../contract-delete-dialog/contract-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, HotelCategoryService, AgencyService, BoardService, RoomTypeService, 
  ContractService, CurrencyService, CAgencyService, CBoardService, CRoomTypeService,CMarketService  } from 'src/app/services';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CAgency } from 'src/app/interfaces/cagency';
import { CBoard } from 'src/app/interfaces/cboard';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { FormControl } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

interface DialogData {
  element: Contract;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
  hotels: any[];
  markets: any[];
  agencies: any[];
  boards: any[];
  currencies: any[];
  hotelCategories: any[];
  roomTypes: any[];
  cMarkets: any[];
  cAgencies: any[];
  cBoards: any[];
  cRoomTypes: any[];
}

@Component({
  selector: 'app-contract-update-dialog',
  templateUrl: './contract-update-dialog.component.html',
  styleUrls: ['./contract-update-dialog.component.scss']
})
export class ContractUpdateDialogComponent implements OnInit {
  
  contract = this.data.element;
  code: string = this.data.element.code;
  name: string = this.data.element.name;
  price: number = this.data.element.price;
  start: Date = this.data.element.enteredDate;
  end: Date = this.data.element.exitDate;
  hotel: number = this.data.element.hotelId;
  currency: number = this.data.element.currencyId;
  selectedAgencies: CAgency[] = this.data.element.agencyList;
  selectedBoards: CBoard[] = this.data.element.boardList;
  selectedMarkets: CMarket[] = this.data.element.marketList;
  selectedRoomTypes: CRoomType[] = this.data.element.roomTypeList;
  

  constructor(
    public translocoService: TranslocoService,
    private hotelService: HotelService,
    private dialogRef: MatDialogRef<ContractUpdateDialogComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    //this.contract = this.data.element;
    this.markets = this.data.markets;
    this.agencies = this.data.agencies;
    this.boards = this.data.boards;
    this.roomTypes = this.data.roomTypes;
    this.hotels = this.data.hotels;
  }
 
  hotels: any[] = [];
  markets: any[] = [];
  categories: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  selectedValue: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets : any[] =[];
  cRoomTypes: any[] = [];


  ngOnInit(): void {

    // this.contractService.getAllContracts().subscribe(res => {
    //   this.contracts = res.data;
    // });

    const idAgency = this.data.cAgencies.filter(cA => cA.listId === this.data.element.id).map(cA => cA.agencyId);
     //idAgency.map(i => this.agencies.find(a => a.id === i).name);
     console.log("idAgency" + idAgency);
     //this.selectedValue = [1,2,3];
     this.selectedValue = idAgency;
     
     
     
     //this.selectedValue = idAgency;
     
  }

  contracts: Contract[] = [];

  update() {
    if (!this.code) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    if (this.start > this.end) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }

    const otherContracts = this.contracts.filter(c =>
      c.code !== this.code &&
      c.name !== this.name &&
      c.price !== this.price &&
      c.hotelId !== this.hotel &&
      c.currencyId !== this.currency &&
      c.enteredDate !== this.start &&
      c.exitDate !== this.end);
      if (otherContracts.some(c =>
      c.code === this.code &&
      c.name === this.name &&
      c.price === this.price &&
      c.hotelId === this.hotel &&
      //c.marketId === this.market &&
      //c.agencyId === this.agency &&
      //c.boardId === this.board &&
      //c.roomTypeId === this.roomType &&
      c.currencyId === this.currency)) {this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'kontrakt' }), "OK");
      this.code = "";
      this.name = "";
      this.price == null;
      this.start == null,
        this.end == null,
        this.hotel == null;
      this.currency == null;
      
      return;
   
    }

    console.log("this.data.element.name" + this.data.element.name );
    console.log("agencies" + this.agencies);
    
    

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.name }));
    this.data.dialogRef?.close();
    this.data.element.code = this.code;
    this.data.element.name = this.name;
    this.data.element.price = this.price;
    this.data.element.enteredDate = this.start;
    this.data.element.exitDate = this.end;
    this.data.element.hotelId = this.hotel;
    this.data.element.currencyId = this.currency;
    this.data.element.agencyList = this.selectedAgencies;
    this.data.element.marketList = this.selectedMarkets;
    this.data.element.boardList = this.selectedBoards;
    this.data.element.roomTypeList = this.selectedRoomTypes;
    
    console.log("this.data.element"+this.data.element);
    this.dialogRef.close({ isUpdated: true });
    this.data.table?.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
