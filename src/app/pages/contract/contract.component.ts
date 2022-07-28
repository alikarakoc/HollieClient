import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent, ContractUpdateDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';
import { AgencyService, BoardService, ContractService, CurrencyService, HotelService, MarketService, RoomTypeService } from 'src/app/services';
import { CAgencyService } from 'src/app/services/cagency.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end", "actions"];
  dataSource: MatTableDataSource<Contract>;

  @ViewChild(MatTable) table: MatTable<Contract>;
  @ViewChild(MatSort) sort: MatSort;

  Contrats = 'Contract.xlsx';

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
    private cagencyService: CAgencyService,
    private excelService: ExcelService
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  cAgencies: any[] = [];

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
      this.roomTypes = res.data;
    });

    this.currencyService.getAllCurrency().subscribe(res => {
      this.currencies = res.data;
    });

    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });

    this.cagencyService.getAllCAgencies().subscribe(res => {
      this.cAgencies = res.data;
    });

    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
      this.dataSource = new MatTableDataSource<Contract>(this.contracts);
      this.dataSource.sort = this.sort;
    });

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.contracts, 'Contracts');
  }

  toDate(v: string) {
    return new Date(v);
  }

  create() {
    // console.log(this.contracts);
    // console.log(this.agencies);
    // console.log(this.boards);
    // console.log(this.hotels);
    // console.log(this.roomTypes);
    // console.log(this.markets);

    const dialog = this.dialog.open(ContractAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {

        console.log(result.element.agencyList);

        // console.log(element);
        
        const agencyList = result.element.agencyList.map((a: any) => {
          return { agencyId: a, listId: element.id };
        });
        
        console.log(agencyList);
        
        this.contractService
        .addContract({ ...result.element, agencyList })
        .subscribe(() => {
          this.ngOnInit();
        });
        
        // console.log(result.element);
        const element = this.contracts.find(c => c.code === result.element.code)!;
        

        console.log(this.cAgencies);
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
    });
  }


  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return this.agencies.find(a => a.id === element.agencyId)!.name;
        // console.log(this.agencies);
        return element.agencyId;

      case 'board':
        // return this.boards.find(a => a.id === element.boardId)!.name;
        // console.log(this.boards);
        return element.boardId;

      case 'room_type':
        // return this.roomTypes.find(a => a.id === element.roomTypeId)!.name;
        // console.log(this.roomTypes);
        return element.roomTypeId;

      case 'market':
        // console.log(this.markets);
        return element.marketId;
      // return this.markets.find(a => a.id === element.marketId)!.name;

      case 'hotel':
        // return this.hotels.find(a => a.id === element.hotelId)!.name;
        // console.log(this.hotels);
        return element.hotelId;

      case 'currency':
        return this.contracts.find(a => a.id === element.id)!.name;
    }
  }
}
