import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import { Currency } from "src/app/interfaces";
import { CurrencyService } from 'src/app/services';
import {
  CurrencyAddDialogComponent,
  CurrencyDeleteDialogComponent,
  CurrencyUpdateDialogComponent,
} from 'src/app/components';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  columns: string[] = ["code", "name", "value"];
  //columns: string[] = ["code", "name", "value", "actions"];
  dataSource: MatTableDataSource<Currency>;

  value = '';

  @ViewChild(MatTable) table: MatTable<CurrencyComponent>;
  @ViewChild(MatSort) sort: MatSort;
  checkButtonCount:number = 0;

  currencies: Currency[] = [];

  constructor(
    public translocoService: TranslocoService,
    private dialog: MatDialog,
    public CurrencyService: CurrencyService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.currencies, 'Currency');
  }

  filterCurrencies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  clear(){
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.CurrencyService.getAllCurrency().subscribe((res) => {
      if(res.data!=null){
        this.currencies = res.data;
      }
      
      
      this.dataSource = new MatTableDataSource<Currency>(this.currencies);
      this.dataSource.sort = this.sort;
    });

    
  }

  updateCurrency(){
    this.CurrencyService.updateCurrencyValue().subscribe((res) => {
      this.ngOnInit();
    });
  }

  create() {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(CurrencyAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.CurrencyService
          .addCurrency({ name: result.elementName, code: result.elementCode, value: result.elementValue })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;
}

  // delete(element: Currency) {
  //   const dialog = this.dialog.open(CurrencyDeleteDialogComponent, {
  //     data: { element },
  //   });
  //   dialog.afterClosed().subscribe((result) => {
  //     if (result.isDeleted) {
  //       this.CurrencyService.deleteCurrency(element).subscribe((res) => {
  //         console.log(element);
  //         this.ngOnInit();
  //       });
  //     }
  //   });
  // }

  // update(element: Currency) {
  //   const dialog = this.dialog.open(CurrencyUpdateDialogComponent, {
  //     data: { element },
  //   });

  //   dialog.afterClosed().subscribe(() => {
  //     this.CurrencyService.updateCurrency(element).subscribe((res) => {

  //       console.log('res data checked');
  //       console.log(res.data);
  //     });
  //   });
  // }

 

}
