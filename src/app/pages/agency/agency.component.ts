import {ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import {
  AgencyAddDialogComponent,
  AgencyDeleteDialogComponent,
  AgencyUpdateDialogComponent,
} from 'src/app/components';
import { Agency,Market } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { AMarketService } from 'src/app/services/amarket.service';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { MarketService } from 'src/app/services';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
})
export class AgencyComponent implements OnInit{
  columns: string[] = ['code', 'name', 'address', 'phone', 'email','market', 'actions'];
  dataSource: MatTableDataSource<Agency>;
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Agency>;
  @ViewChild(MatSort) sort: MatSort;
  Agency = 'Agency';

  markets: any[] = [];
  aMarkets: any[] = [];
  agencies: Agency[] = [];

  checkButtonCount:number = 0;
  //tuana
  constructor(
    private cdr: ChangeDetectorRef,
    public agencyService: AgencyService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private aMarketService: AMarketService,
    private marketService: MarketService,
    private excelService: ExcelService
  ) { }


  ngOnInit(): void {

    this.agencyService.getAllAgencies().subscribe((res) => {
      if(res.data != null){
        this.agencies = res.data;

      }
      this.dataSource = new MatTableDataSource<Agency>(this.agencies);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    });
    this.marketService.getAllMarkets().subscribe((res) => {
      if(res.data != null){
        this.markets = res.data;
      }
    });
    this.aMarketService.getAllAMarkets().subscribe(res => {
      if(res.data!=null){
        this.aMarkets = res.data;
      }
    });

  }

  getItem(type:"market", element: Agency) {
    switch (type) {
      case 'market':


        const idMarket = this.aMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);
    }
  }

  getCurrentMarket(element: Market){
    return this.markets.find(c=> c.id ===element.id)?.name;
  }

  // getItem(element:Agency){
  //   const idMarket = this.aMarkets.filter(aM => aM.listId === element.id).map(aM => aM.marketId);
  //       return idMarket.map(i => this.markets.find(m => m.id === i).name);
  // }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.agencies, this.Agency);
  }

  filterAgencies(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }


  create() {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(AgencyAddDialogComponent, {
      data: { table: this.table }
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.agencyService
          .addAgency({ name: result.elementName, code: result.elementCode, address: result.elementAddress, email: result.elementEmail, phone: result.elementPhone, marketList:result.elementMarket })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;
}

  update(element: Agency) {
    const dialog = this.dialog.open(AgencyUpdateDialogComponent, {
      data: { element, markets: this.markets, aMarkets:this.aMarkets}
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.agencyService.updateAgency(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  delete(element: Agency) {
    const dialog = this.dialog.open(AgencyDeleteDialogComponent, {
      data: { element }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.agencyService.deleteAgency(element).subscribe((res) => {
          this.ngOnInit();

        });
      }
    });
  }

}
