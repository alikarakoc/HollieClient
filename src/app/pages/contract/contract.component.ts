import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent, ContractDetailsComponent, ContractUpdateDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';
import { AgencyService, BoardService, ContractService, CurrencyService, HotelService, MarketService, RoomTypeService } from 'src/app/services';
import { CAgencyService } from 'src/app/services/cagency.service';
import { CBoardService } from 'src/app/services/cboard.service';
import { CMarketService } from 'src/app/services/cmarket.service';
import { CRoomTypeService } from 'src/app/services/croomtype.service';
import { RoomService } from 'src/app/services/room.service';
import { ExcelService } from 'src/app/services/excel.service';
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { AMarketService } from 'src/app/services/amarket.service';
import { AMarket } from 'src/app/interfaces/amarket';
import { MatPaginator } from '@angular/material/paginator';
import { ContractCopyDialogComponent } from 'src/app/components/contract-copy-dialog/contract-copy-dialog.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "hotel", "feature","start", "end", "actions", "seeDetails"];
  dataSource: MatTableDataSource<Contract>;

  value = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Contract>;
  @ViewChild(MatSort) sort: MatSort;

  Contrats = 'Contract.xlsx';

  contracts: Contract[] = [];
  checkButtonCount:number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    public contractService: ContractService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelService: HotelService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    //private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private cagencyService: CAgencyService,
    private cboardService: CBoardService,
    private cmarketService: CMarketService,
    private croomTypeService : CRoomTypeService,
    private hotelFeatureService: HotelFeatureService,
    private excelService: ExcelService
  ) { }

  hotels: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  //rooms: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];
  //cRooms: any[] = [];
  hotelFeatures: HotelFeature[] =[];
  marketAgency : any[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data!=null){
        this.hotels = res.data;
      }
    });

    this.marketService.getAllMarkets().subscribe(res => {
      if (res.data!=null){
        this.markets = res.data;
      }
    });

    this.agencyService.getAllAgencies().subscribe(res => {
      if(res.data!=null){
        this.agencies = res.data;
      }
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      if(res.data!=null){
        this.roomTypes = res.data;
      }
    });

    this.currencyService.getAllCurrency().subscribe(res => {
      if(res.data!=null){
        this.currencies = res.data;
      }
    });

    this.boardService.getAllBoards().subscribe(res => {
      if(res.data!=null){
       this.boards = res.data;
      }
    });

    this.cagencyService.getAllCAgencies().subscribe(res => {
      if(res.data!=null){
        this.cAgencies = res.data;
      }
    });

    this.cboardService.getAllCBoards().subscribe(res => {
      if(res.data!=null){
       this.cBoards = res.data;
     }
    });


    this.cmarketService.getAllCMarkets().subscribe(res => {
      if(res.data!=null){
        this.cMarkets = res.data;
      }
    });

    this.croomTypeService.getAllCRoomTypes().subscribe(res => {
      if(res.data!=null){
        this.cRoomTypes = res.data;
      }
    });

    // this.roomService.getAllRooms().subscribe(res => {
    //   if(res.data!=null){
    //     this.rooms = res.data;
    //   }
    // });


    this.hotelFeatureService.getAllFeatures().subscribe(res=>{
      if(res.data !== null){
        this.hotelFeatures = res.data;
      }
    });

    this.marketService.getMarketSelectList().subscribe(res => {
      if (res.data != null) {
        this.marketAgency = res.data;
      }
    });

    this.contractService.getAllContracts().subscribe(res => {
      if(res.data!=null){
         this.contracts = res.data;
      this.dataSource = new MatTableDataSource<Contract>(this.contracts);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      }
    });

  }


  filterContracts(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  exportAsXLSX(): void {
    const arrayToExport = this.contracts.map(c => {
      return {
        code: c.code,
        name: c.name,
        currency: this.getItem('currency', c),
        hotels: this.getItem('hotel', c),
        //rooms: this.getItem('room', c).toString(),
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
    if(this.checkButtonCount < 1) {
      const dialog = this.dialog.open(ContractAddDialogComponent, {
        data: { table: this.table, roomTypes: this.roomTypes, hotels: this.hotels,
          markets: this.markets, agencies: this.agencies, currencies:this.currencies,
          boards: this.boards, cAgencies:this.cAgencies, cBoards: this.cBoards,cRoomTypes: this.cRoomTypes,
          cMarkets:this.cMarkets, marketAgency : this.marketAgency } ,
      });

    dialog.afterClosed().subscribe((result) => {
      console.log(result.element);
      if (result.isAdded) {
        this.contractService
          .addContract(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });

  }
  this.checkButtonCount += 1;
  }

  copy(element: Contract) {
    const copyElement: Contract = element;
    const dialog = this.dialog.open(ContractCopyDialogComponent, { data: {
      element: copyElement, roomTypes: this.roomTypes, hotels: this.hotels,
      markets: this.markets, agencies: this.agencies, currencies:this.currencies,
      boards: this.boards, cAgencies:this.cAgencies, cBoards: this.cBoards,
      cRoomTypes: this.cRoomTypes,  cMarkets:this.cMarkets, marketAgency : this.marketAgency  } });
      
      dialog.afterClosed().subscribe((result) => {
        console.log(result.element);
        if (result.isAdded) {
          this.contractService.addContract(result.element).subscribe(() => {
              this.ngOnInit();
            });
        }
        this.checkButtonCount = 0;
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
    const dialog = this.dialog.open(ContractUpdateDialogComponent, { data: {
      element: element, roomTypes: this.roomTypes, hotels: this.hotels,
      markets: this.markets, agencies: this.agencies, currencies:this.currencies,
      boards: this.boards, cAgencies:this.cAgencies, cBoards: this.cBoards,
      cRoomTypes: this.cRoomTypes,  cMarkets:this.cMarkets, marketAgency : this.marketAgency  } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.contractService.updateContract(element).subscribe(() => this.ngOnInit());
      }
    });
  }


  

  seeDetails(element: Contract) {
    this.dialog.open(ContractDetailsComponent, { data: {
      contract: element, roomTypes: this.roomTypes, hotels: this.hotels,
      markets: this.markets, agencies: this.agencies, currencies:this.currencies,
      boards: this.boards, cAgencies:this.cAgencies, cBoards: this.cBoards,
      cMarkets:this.cMarkets, cRoomTypes:this.cRoomTypes } });

  }




  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        const idAgency = this.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        const idBoard = this.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

      case 'room_type':
        const idRoomType = this.cRoomTypes.filter(cR => cR.listId === element.id).map(cR => cR.roomTypeId);
        return idRoomType.map(i => this.roomTypes.find(r => r.id === i).name);

      case 'market':
        const idMarket = this.cMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);

      // case 'room':
      //     const idRoomType = this.cRoomTypes.filter(cM => cM.listId === element.id).map(cM => cM.roomId);
      //     return idRoomType.map(i => this.rooms.find(m => m.id === i).name);

      case 'hotel':
        return this.hotels.find(h => h.id === element.hotelId)?.name;


      case 'currency':
        return this.currencies.find(c => c.id === element.currencyId)?.code;

    }
  }

  getCurrentFeature(element: Contract){
    const feature = this.hotels.filter(cM => cM.id === element.hotelId).map(cM => cM.hotelFeatureId);

    let fBaby = feature.map(i => this.hotelFeatures.find(m => m.id === i)?.babyTop);
    let fChild = feature.map(i => this.hotelFeatures.find(m => m.id === i)?.childTop);
    let fTeen = feature.map(i => this.hotelFeatures.find(m => m.id === i)?.teenTop);

    return "[ " + fBaby + " - " + fChild + " - " + fTeen + " ]"
  }

}


