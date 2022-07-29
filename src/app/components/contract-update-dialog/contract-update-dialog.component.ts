import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { ContractDeleteDialogComponent } from "../contract-delete-dialog/contract-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, HotelCategoryService, AgencyService, BoardService, RoomTypeService, ContractService, CurrencyService } from 'src/app/services';
import { CMarket } from 'src/app/interfaces/cmarket';
import { CAgency } from 'src/app/interfaces/cagency';
import { CBoard } from 'src/app/interfaces/cboard';
import { CRoomType } from 'src/app/interfaces/croomtype';

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
  name: string = this.data.element.name;
  price: number = this.data.element.price;
  start: Date = this.data.element.enteredDate;
  end: Date = this.data.element.exitDate;
  hotel: number = this.data.element.hotelId;
  //market: number = this.data.element.marketId;
  //category: number=this.data.element.categoryId;
  //agency: number = this.data.element.agencyId;
  //board: number = this.data.element.boardId;
  //roomType: number = this.data.element.roomTypeId;
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
      //c.marketId !== this.market &&
      //c.agencyId !== this.agency &&
      //c.boardId !== this.board &&
      //c.roomTypeId !== this.roomType &&
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
      c.currencyId === this.currency)) {
      //console.log(this.code, this.name, this.price, this.start,this.end,this.hotel,this.market,this.agency,this.board,this.roomType,this.currency);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'kontrakt' }), "OK");
      this.code = "";
      this.name = "";
      this.price == null;
      // start: new Date(2022, 1 - 1, 20),
      // end: new Date(2022, 1 - 1, 26),
      this.start == null,
        this.end == null,
        this.hotel == null;
      //this.market == null;
      //this.agency == null;
      //this.board == null;
      //this.roomType == null;
      this.currency == null;

      return;
    }

    console.log("this.selectedAgencies"+this.selectedAgencies.toString() );
      



    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.name }));
    this.data.dialogRef?.close();
    this.data.element.code = this.code;
    this.data.element.name = this.name;
    this.data.element.price = this.price;
    this.data.element.enteredDate = this.start;
    this.data.element.exitDate = this.end;
    this.data.element.hotelId = this.hotel;
    //this.data.element.marketId = this.market;
    //this.data.element.agencyId = this.agency;
    //this.data.element.boardId = this.board;
    //this.data.element.roomTypeId = this.roomType;
    this.data.element.currencyId = this.currency;
    this.data.element.agencyList = this.selectedAgencies;
    this.data.element.marketList = this.selectedMarkets;
    this.data.element.boardList = this.selectedBoards;
    this.data.element.roomTypeList = this.selectedRoomTypes;




    console.log(this.data.element);
    
    //this.contractService.updateContract(this.data.element)
    this.dialogRef.close({ isUpdated: true });
    // this.contractService.updateContract(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }


  delete() {

    const dialog = this.dialog.open(ContractDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.contractService.deleteContract({
          code: this.code,
          name: this.name,
          price: this.price,
          enteredDate: this.start,
          exitDate: this.end,
          hotelId: this.hotel,
          //marketId: this.market,
          //agencyId: this.agency,
          //boardId: this.board,
          //roomTypeId: this.roomType,
          //selectedMarkets: this.selectedMarkets,
          currencyId: this.currency
        }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });





  }
}
