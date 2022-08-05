import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  
  @ViewChild(MatTable) table: MatTable<MarketComponent>;
  @ViewChild(MatSort) sort: MatSort;

  Market = 'ExcelSheet.xlsx';

  markets: Market[] = [];

  constructor(
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
      
      console.log(res.data);
      this.dataSource = new MatTableDataSource(this.markets);
      this.dataSource.sort = this.sort;
    });
  }

  filterMarkets(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  create() {
    const dialog = this.dialog.open(MarketAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.marketService
          .addMarket({
            name: result.elementName, code: result.elementCode
          })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
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

