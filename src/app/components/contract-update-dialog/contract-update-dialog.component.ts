import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { ContractDeleteDialogComponent } from "../contract-delete-dialog/contract-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, HotelCategoryService, AgencyService, BoardService, RoomTypeService, ContractService, CurrencyService } from 'src/app/services';

interface DialogData {
  element: Contract;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-contract-update-dialog',
  templateUrl: './contract-update-dialog.component.html',
  styleUrls: ['./contract-update-dialog.component.scss']
})
export class ContractUpdateDialogComponent implements OnInit {
  code: string = this.data.element.code;
  name: string =this.data.element.name;
  price: number=this.data.element.price;
  start: Date=this.data.element.enteredDate;
  end: Date=this.data.element.exitDate;
  hotel: number=this.data.element.hotelId;
  market: number[]=this.data.element.marketIds;
  //category: number=this.data.element.categoryId;
  agency: number[]=this.data.element.agencyIds;
  board: number[]=this.data.element.boardIds;
  roomType: number[]=this.data.element.roomTypeIds;
  currency: number=this.data.element.currencyId;

  constructor(
    public translocoService: TranslocoService,
    private hotelService: HotelService,
    private dialogRef: MatDialogRef<ContractUpdateDialogComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private marketService: MarketService,
    private hotelCategoryService: HotelCategoryService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private contractService: ContractService,
    private currencyService: CurrencyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  categories: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });

    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      this.agencies = res.data;
    });

    // TODO: Github'dan pull ettikten sonra yorumu kaldır
    this.currencyService.getAllCurrency().subscribe(res => {
      this.currencies = res.data;
    });
  }

contracts:Contract[]=[];

  update(){

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
      c.price !== this.price&& 
      c.hotelId !== this.hotel&&
      c.marketIds!==this.market&&
      c.agencyIds !== this.agency&&
      c.boardIds !== this.board&&
      c.roomTypeIds !== this.roomType&&
      c.currencyId !== this.currency &&
      c.enteredDate !== this.start &&
      c.exitDate !== this.end);

    if (otherContracts.some(c => 
      c.code === this.code && 
      c.name === this.name && 
      c.price === this.price && 
      c.hotelId === this.hotel&&
      c.marketIds === this.market&&
      c.agencyIds === this.agency&&
      c.boardIds === this.board&&
      c.roomTypeIds === this.roomType&&
      c.currencyId === this.currency )) {
      //console.log(this.code, this.name, this.price, this.start,this.end,this.hotel,this.market,this.agency,this.board,this.roomType,this.currency);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'kontrakt' }), "OK");
      this.code = "";
      this.name = "";
      this.price == null;
      // start: new Date(2022, 1 - 1, 20),
      // end: new Date(2022, 1 - 1, 26),
       this.start == null,
       this.end == null,
      this.hotel== null;
      this.market== null;
      this.agency==null;
      this.board==null;
      this.roomType==null;
      this.currency==null;

      return;
    }


    
    this.snackBar.open(this.translocoService.translate('dialogs.update_success'));
    this.data.dialogRef?.close();
    this.data.element.code = this.code;
    this.data.element.name = this.name;
    this.data.element.price = this.price;
    this.data.element.enteredDate = this.start;
    this.data.element.exitDate = this.end;
    this.data.element.hotelId = this.hotel;
    this.data.element.marketIds= this.market;
    this.data.element.agencyIds = this.agency;
    this.data.element.boardIds = this.board;
    this.data.element.roomTypeIds = this.roomType;
    this.data.element.currencyId= this.currency;

   


    console.log(this.data.element);
    this.data.table?.renderRows();
     //this.contractService.updateContract(this.data.element)
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }


  delete(){

    const dialog = this.dialog.open(ContractDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
       this.contractService.deleteContract({ 
        code: this.code, 
        name: this.name, 
        price: this.price,
        enteredDate:this.start,
        exitDate:this.end,
        hotelId:this.hotel,
        marketIds:this.market,
        agencyIds:this.agency,
        boardIds:this.board,
        roomTypeIds:this.roomType,
        currencyId:this.currency }).subscribe(() => 
       {
          this.ngOnInit();
        });
      }
    });





  }
}
