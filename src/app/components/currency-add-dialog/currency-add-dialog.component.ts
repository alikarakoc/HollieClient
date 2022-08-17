import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Currency } from "src/app/interfaces";
import { CurrencyService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  table: MatTable<Currency>;
}

@Component({
  selector: 'app-currency-add-dialog',
  templateUrl: './currency-add-dialog.component.html',
  styleUrls: ['./currency-add-dialog.component.scss']
})
export class CurrencyAddDialogComponent implements OnInit {
  currencyName: string;
  currencyCode: string;
  currencyValue: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CurrencyAddDialogComponent>,
    private currencyService: CurrencyService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  add() {

    if (!this.currencyCode) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.currencyService.getAllCurrency().subscribe((res) => {
      if (res.data !== null && res.data.some(c =>  c.code === this.currencyCode)) {
          this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'currency' : 'döviz' }), "OK");
          this.currencyName = "";
          return;
        }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.currencyName }));


    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.currencyName,
      elementCode: this.currencyCode,
      elementValue: this.currencyValue
    });
  }





}
