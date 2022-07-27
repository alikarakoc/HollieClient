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
  columns: string[] = ["code", "name", "value", "actions"];
  dataSource: MatTableDataSource<Currency>;

  @ViewChild(MatTable) table: MatTable<CurrencyComponent>;
  @ViewChild(MatSort) sort: MatSort;

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

  ngOnInit(): void {
    this.CurrencyService.getAllCurrency().subscribe((res) => {
      this.currencies = res.data;
      this.dataSource = new MatTableDataSource<Currency>(this.currencies);
      this.dataSource.sort = this.sort;
    });
  }

  create() {
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
    });
  }

  delete(element: Currency) {
    const dialog = this.dialog.open(CurrencyDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.CurrencyService.deleteCurrency(element).subscribe((res) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }

  update(element: Currency) {
    const dialog = this.dialog.open(CurrencyUpdateDialogComponent, {
      data: { element },
    });

    dialog.afterClosed().subscribe(() => {
      this.CurrencyService.updateCurrency(element).subscribe((res) => {

        console.log('res data checked');
        console.log(res.data);
      });
    });
  }

}
