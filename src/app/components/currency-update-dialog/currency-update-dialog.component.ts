import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Currency } from 'src/app/interfaces';
import { CurrencyService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { CurrencyDeleteDialogComponent } from '../currency-delete-dialog/currency-delete-dialog.component';

interface DialogData {
  element: Currency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-currency-update-dialog',
  templateUrl: './currency-update-dialog.component.html',
  styleUrls: ['./currency-update-dialog.component.scss']
})
export class CurrencyUpdateDialogComponent implements OnInit {
  newCurrencyValue: number = this.data.element.value;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CurrencyUpdateDialogComponent>,
    private snackBar: MatSnackBar,
    private currencyService: CurrencyService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close({
      isUpdated: true
    });
  }

  update() {
    if (!this.newCurrencyValue) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), 'OK');
      return;
    }

    this.currencyService.getAllCurrency().subscribe(res => {
      const otherCurrencies = res.data.filter(v => v.id !== this.data.element.id);

    });

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.data.element.name }));
    this.data.element.value = this.newCurrencyValue;

    this.closeDialog();
    //this.dialogData.table.renderRows();
  }

  delete() {
    const dialog = this.dialog.open(CurrencyDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.currencyService.deleteCurrency(this.data.element).subscribe(() => {
          this.ngOnInit();
        });
      } this.data.table?.renderRows();
    });
  }


}

