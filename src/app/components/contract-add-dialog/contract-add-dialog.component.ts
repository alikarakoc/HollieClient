import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, HotelCategoryService, AgencyService, BoardService, RoomTypeService, CurrencyService } from 'src/app/services';


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
  start: Date;
  end: Date;
  hotel: number;
  market: number;
  category: number;
  agency: number;
  board: number;
  roomType: number;
  currency: number;

  constructor(
    public translocoService: TranslocoService,
    private dialogRef: MatDialogRef<ContractAddDialogComponent>,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private contractService: ContractService,
    
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  contracts: any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      this.agencies = res.data;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data
    });

    this.currencyService.getAllCurrency().subscribe(res => {
      this.currencies = res.data
    });

    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });

    this.contractService.getAllContracts().subscribe(res => { this.contracts = res.data})

  }

  add() {
    const predicate = (a: Omit<Contract, 'id'>) =>
      a.hotelId=== this.hotel &&
      a.marketId === this.market &&
      a.agencyId === this.agency &&
      a.code === this.contractCode &&
      a.name === this.name &&
      a.price === this.price &&
      a.boardId === this.board;


    const condition = this.contractService.contracts.some(predicate);

    this.contractService.getAllContracts().subscribe((res) => {
      if(res.data.some(c =>c.code === this.contractCode)){
        this.snackBar.open(this.translocoService.translate('dialogs.error_same' , { data : this.translocoService.getActiveLang() === 'en'? 'contract' : 'sözleşme'}), "OK");
        this.contractCode = "";
        return;
      }
    });

    if (!this.contractCode || !this.hotel || !this.market || !this.agency || !this.board || !this.name || !this.price) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
      return;
    }

 
    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Contract' : 'Sözleşme' }), 'OK');
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: name }));

    this.closeDialog();
    this.data.table.renderRows();
    console.log(this.hotel)
  }


  closeDialog(){
    console.log(this.contractCode);

    this.dialogRef.close({
      isAdded : true,
      element: {
        code : this.contractCode,
        name : this.name,
        price : this.price,
        start: this.start,
        end : this.end,
        hotelId : this.hotel,
        marketId: this.market,
        agencyId : this.agency,
        boardId : this.board,
        roomtypeId : this.roomType,
        currencyId : this.currency,

      }
    });

  }
  }
