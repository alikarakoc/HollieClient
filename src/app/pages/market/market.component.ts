import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {
  MarketAddDialogComponent,
  MarketDeleteDialogComponent,
  MarketUpdateDialogComponent,
} from 'src/app/components';
import { Market } from 'src/app/interfaces';
import { MarketService } from 'src/app/services';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  columns: string[] = ['code', 'name', 'actions'];
  dataSource: MatTableDataSource<Market>;

  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<MarketComponent>;
  @ViewChild(MatSort) sort: MatSort;
  checkButtonCount: number = 0;

  Market = 'ExcelSheet.xlsx';

  markets: Market[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public marketService: MarketService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.markets, 'Market');
  }

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe((res) => {
      if(res.data != null){
        this.markets = res.data;
      }
      this.dataSource = new MatTableDataSource(this.markets);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });
  }

  filterMarkets(event: Event) {
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
    if(this.checkButtonCount < 1 ) {
    const dialog = this.dialog.open(MarketAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.marketService
          .addMarket({
            name: result.elementName, code: result.elementCode, createdUser: result.createdUser
          })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;
}

  update(element: Market) {
    const dialog = this.dialog.open(MarketUpdateDialogComponent, {
      data: { element },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.marketService.updateMarket(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  delete(element: Market) {
    const dialog = this.dialog.open(MarketDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.marketService.deleteMarket(element).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });
  }
}

