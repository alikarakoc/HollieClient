import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent, ContractUpdateDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';
import { AgencyService, BoardService, ContractService, CurrencyService, HotelService, MarketService, RoomTypeService } from 'src/app/services';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end", "actions"];
  @ViewChild(MatTable) table: MatTable<Contract>;

  Contrats= 'ExcelSheet.xlsx';

  contracts: Contract[] = [];

  constructor(
    public contractService: ContractService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelService: HotelService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private excelService:ExcelService
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
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

    this.contractService.getAllContracts().subscribe(res => { this.contracts = res.data })

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.contracts, 'Contrats');
  }

  toDate(v: string) {
    return new Date(v);
  }

  create() {
    console.log(this.contracts);

    const dialog = this.dialog.open(ContractAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.contractService
          .addContract(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });

        console.log(result.element);
      }
    });


  }

  delete(element: Contract) {
    const dialog = this.dialog.open(ContractDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.contractService.deleteContract(element).subscribe((res: any) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }

  update(element: Contract) {
    const dialog = this.dialog.open(ContractUpdateDialogComponent, { data: { element } });
    dialog.afterClosed().subscribe(result => {
      if (result.isUpdated) {
        this.contractService.updateContract(element).subscribe(() => this.ngOnInit());
      }
    })
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return this.agencies.find(a => a.id === element.agencyId)?.name;
        return element.agencyIds;

      case 'board':
        // return this.boards.find(a => a.id === element.boardId)?.name;
        return element.boardIds;

      case 'room_type':
        return element.roomTypeIds;
        // return this.roomTypes.find(a => a.id === element.roomTypeId)?.name;

      case 'market':
        return element.marketIds;
        // return this.markets.find(a => a.id === element.marketId)?.name;

      case 'hotel':
        return element.hotelId;
        // return this.hotels.find(a => a.id === element.hotelId)?.name;

      case 'currency':
        return this.currencies.find(a => a.id === element.currencyId)?.name;
    }
  }
}
