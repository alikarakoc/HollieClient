import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { ContractDetailsComponent } from 'src/app/components';
import { Contract, Hotel } from "src/app/interfaces";
import { CRoomTypeService } from 'src/app/services/croomtype.service';
import { RoomService } from 'src/app/services/room.service';
import { ContractService, HotelService, ExcelService, CBoardService, CAgencyService, CMarketService, RoomTypeService, AgencyService, BoardService, CurrencyService, MarketService } from "src/app/services";
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { MatPaginator } from '@angular/material/paginator';
import { Accommodation } from 'src/app/interfaces/accommodation';
import { PriceSearchDetail } from 'src/app/interfaces/price-search-detail';
import { AccommodationDetailComponent } from 'src/app/components/accommodation-detail/accommodation-detail.component';


@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})

export class AccommodationComponent implements OnInit {
  columns: string[] = [ "agencyName", "hotelName", "roomName", "totalPrice" ,"detail"];
  dataSource: MatTableDataSource<Accommodation>;
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<AccommodationComponent>;

  startDate: Date;
  endDate: Date;
  adult: number;
  ad?: number;
  gun: number;
  contDay: number;
  child1?: number;
  child2?: number;
  child3?: number;
  numberOfChild?: number;
  hotelIds: number[];
  totalPrice: number = 0;


  constructor(
    private cdr: ChangeDetectorRef,
    private hotelService: HotelService,
    private dialog: MatDialog,
    private contractService: ContractService,
    private marketService: MarketService,
    private agencyService: AgencyService,
    private boardService: BoardService,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private currencyService: CurrencyService,
    private cAgencyService: CAgencyService,
    private cBoardService: CBoardService,
    private cMarketService: CMarketService,
    private excelService: ExcelService,
    private croomTypeService: CRoomTypeService,
    private translocoService: TranslocoService,
    private hotelFeatureService: HotelFeatureService,
    private snackBar: MatSnackBar
  ) { }

  contract: Contract;
  hotels: Hotel[] = [];
  contracts: Contract[] = [];
  result: Accommodation[] = [];
  rooms: any[] = [];
  cRooms: any[] = [];
  cAgencies: any[] = [];
  cBoards: any[] = [];
  cMarkets: any[] = [];
  cRoomTypes: any[] = [];
  markets: any[] = [];
  agencies: any[] = [];
  boards: any[] = [];
  roomTypes: any[] = [];
  currencies: any[] = [];
  contDays?= (1);
  features: HotelFeature[] = [];
  contBabyTop: any;
  contChildTop: any;
  contTeenTop: any;
  contChildAges: any[] = [];
  //writeDetail: string;



  clearTable() {
    this.result = [];
    this.table.renderRows();
  }


  clear() {
    this.ngOnInit();
  }

 exportAsXLSX(): void {
  //   const arrayToExport = this.result.map(c => {
  //     return {
  //       currency: this.getItem('currency', c),
  //       hotels: this.getItem('hotel', c),
  //       markets: this.getItem('market', c).toString(),
  //       agencies: this.getItem('agency', c).toString(),
  //       boards: this.getItem('board', c).toString(),
        
  //     }
  //   });
  //   this.excelService.exportAsExcelFile(arrayToExport, 'Contracts_Filtered');
   }

  ngOnInit(): void {

    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });

    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
      this.dataSource = new MatTableDataSource(this.result);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });

  }

  onChangeChild1(event: any) {
  }

  onChangeChild2(event: any) {
  }

  onChangeChild3(event: any) {
  }


  applyFilter() {
    this.result = [];

    const element = {
      beginDate: this.startDate,
      endDate: this.endDate,
      adult: this.adult,
      numberOfChild: this.numberOfChild,
      child1Age: this.child1,
      child2Age: this.child2,
      child3Age: this.child3,
      hotels: this.hotelIds
    };
   element.beginDate.setDate(element.beginDate.getDate()+1);
   element.endDate.setDate(element.endDate.getDate()+1);
   element.beginDate.setUTCHours(0,0,0,0);
   element.endDate.setUTCHours(0,0,0,0);


    this.contractService.detailAccommodation(element).subscribe((res) => {
      if (res.data != null) {
        this.result = res.data;
      }
      this.see(this.result);
    });

    element.beginDate.setDate(element.beginDate.getDate()-1);
    element.endDate.setDate(element.endDate.getDate()-1);

    
  
    this.table.renderRows();

  }

  seeDetails(element: Accommodation) {
    this.dialog.open(AccommodationDetailComponent, { data: {
      accommodation: element} });

  }

  // getDetail(element: Accommodation){
  //   this.writeDetail = "";
  //   var detail: PriceSearchDetail[];
  //   detail = element.priceDetails;
  //   detail.forEach(priceDetail => {
  //      this.writeDetail += "Contract Id: "+priceDetail.contractId + " Day Price " + priceDetail.netPrice + '\n';
  //   });
    
  //   console.log(this.writeDetail);
  //   return this.writeDetail;
    
  // }

  
  
  see(resu: any[]){
    resu.forEach(detail => {
      console.log(detail);
      
    });
  }

  toDate(v: Date | string) {
    return new Date(v);
  }

}
