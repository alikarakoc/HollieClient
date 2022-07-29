import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent, ContractDetailsComponent, ContractUpdateDialogComponent } from "src/app/components";
import { Contract, Currency, Hotel } from 'src/app/interfaces';
import { AgencyService, BoardService, ContractService, CurrencyService, HotelService, MarketService, RoomTypeService } from 'src/app/services';
import { CAgencyService } from 'src/app/services/cagency.service';
import { CBoardService } from 'src/app/services/cboard.service';
import { CMarketService } from 'src/app/services/cmarket.service';
import { CRoomTypeService } from 'src/app/services/croomtype.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end", "actions", "seeDetails"];
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
    private cboardService: CBoardService,
    private croomTypeService: CRoomTypeService,
    private cmarketService: CMarketService,
    private excelService: ExcelService
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];

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

    this.cboardService.getAllCBoards().subscribe(res => {
      this.cBoards = res.data;
    });

    this.croomTypeService.getAllCRoomTypes().subscribe(res => {
      this.cRoomTypes = res.data;
    });

    this.cmarketService.getAllCMarkets().subscribe(res => {
      this.cMarkets = res.data;
    });

    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
      this.dataSource = new MatTableDataSource<Contract>(this.contracts);
      this.dataSource.sort = this.sort;
    });

  }

  exportAsXLSX(): void {
    const arrayToExport = this.contracts.map(c => {
      return {
        code: c.code,
        name: c.name,
        price: c.price,
        currency: this.getItem('currency', c),
        hotels: this.getItem('hotel', c),
        markets: this.getItem('market', c).toString(),
        agencies: this.getItem('agency', c).toString(),
        boards: this.getItem('board', c).toString(),
        roomTypes: this.getItem('room_type', c).toString(),
        startDate: c.enteredDate,
        endDate: c.exitDate
      }
    });

    this.excelService.exportAsExcelFile(arrayToExport, 'Contracts');
  }

  toDate(v: string) {
    return new Date(v);
  }

  create() {

    const dialog = this.dialog.open(ContractAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      console.log(result.element);
      if (result.isAdded) {

        this.contractService
          .addContract(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
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
          this.ngOnInit();
        });
      }
    });
  }

  update(element: Contract) {


    const dialog = this.dialog.open(ContractUpdateDialogComponent, { data: { element } });
    console.log("elemennt1 : " + element);
    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.contractService.updateContract(element).subscribe(() => this.ngOnInit());
      }
    });
  }

  seeDetails(element: Contract) {
    this.dialog.open(ContractDetailsComponent, { data: { contract: element } });
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return this.agencies.find(a => a.id === element.agencyId)!.name;
        // console.log(this.agencies);
        // return element.agencyId;
        // console.log(element);
        // console.log(this.agencies);

        // return element.agencyList.map(ca => {
        //   // this.cAgencies.filter(cA => cA.id === a.agencyId)
        //   return this.agencies.find(a => a.id === ca.agencyId)
        // })

        //console.log(this.cAgencies);
        // return element.agencyList.map(ca => {
        //   // this.cAgencies.filter(cA => cA.id === a.agencyId)
        //   return this.agencies.find(a => a.id === ca.agencyId)
        // })
        const idAgency = this.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        // return this.boards.find(a => a.id === element.boardId)!.name;
        // console.log(this.boards);
        //return element.boardId;
        const idBoard = this.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

      case 'room_type':
        // return this.roomTypes.find(a => a.id === element.roomTypeId)!.name;
        // console.log(this.roomTypes);
        //return element.roomTypeId;
        const idRoom = this.cRoomTypes.filter(cR => cR.listId === element.id).map(cR => cR.roomTypeId);
        return idRoom.map(i => this.roomTypes.find(r => r.id === i).name);

      case 'market':
        // console.log(this.markets);
        //return element.marketId;
        // return this.markets.find(a => a.id === element.marketId)!.name;
        const idMarket = this.cMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);

      case 'hotel':
        // return this.hotels.find(a => a.id === element.hotelId)!.name;
        // console.log(this.hotels);
        const h = this.hotels.find(c => c.id === element.hotelId);
        return h.name;
 
      case 'currency':
        const c = this.currencies.find(c => c.id === element.currencyId);
        // console.log(c);
        
        return c.code
    }
  }


}
