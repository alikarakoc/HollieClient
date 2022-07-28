import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ContractService } from 'src/app/services/contract.service';
import { TranslocoService } from '@ngneat/transloco';
import { Contract } from 'src/app/interfaces';
import { HotelService, MarketService, HotelCategoryService, AgencyService, BoardService, RoomTypeService, CurrencyService } from 'src/app/services';
import { CAgencyService } from 'src/app/services/cagency.service';


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
  selectedMarkets: number;
  selectedAgencies: number[];
  selectedBoards: number;
  selectedRoomTypes: number;
  currency: number;
  listId: number;
  contractId: number;

  constructor(
    public translocoService: TranslocoService,
    private dialogRef: MatDialogRef<ContractAddDialogComponent>,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private cagencyService: CAgencyService,
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
  cAgencies: any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });

    this.marketService.getAllMarkets().subscribe(res => {
      if (res.data !== null) this.markets = res.data;
      else this.markets = [];
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
  }

  add() {
    // const predicate = (a: Omit<Contract, 'id'>) =>
    //   a.hotelId=== this.hotel &&
    //   a.marketIds === this.market &&
    //   a.agencyId === this.agency &&
    //   a.code === this.contractCode &&
    //   a.name === this.name &&
    //   a.price === this.price &&
    //   a.boardId === this.board;
    
    // const condition = this.contractService.contracts.some(predicate);
    
    this.contractService.getAllContracts().subscribe((res) => {
      if (res.data.some(c => c.code === this.contractCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'contract' : 'sözleşme' }), "OK");
        this.contractCode = "";
        return;
      }
    });

    // if (!this.contractCode || !this.hotel || !this.market || !this.agency || !this.board || !this.name || !this.price) {
    //   this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
    //   return;
    // }


    if (this.start > this.end) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_date'));
      return;
    }

    // console.log(this.selectedMarkets, this.selectedAgencies, this.selectedBoards, this.selectedRoomTypes);


    // if (condition) {
    //   this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Contract' : 'Sözleşme' }), 'OK');
    //   return;
    // }

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.name }));

    this.closeDialog();
    this.data.table.renderRows();
    console.log(this.hotel);
  }


  closeDialog() {
    console.log(this.contractCode);

    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.contractCode,
        name: this.name,
        price: this.price,
        enteredDate: this.start,
        exitDate: this.end,
        hotelId: this.hotel,
        marketId: this.selectedMarkets,
        // agencyId: this.selectedAgencies,
        boardId: this.selectedBoards,
        roomtypeId: this.selectedRoomTypes,
        currencyId: this.currency,
        agencyList: this.selectedAgencies
      }
    });

  }
}
