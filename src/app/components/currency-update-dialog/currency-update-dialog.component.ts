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
  newCurrencyValue: number = this.dialogData.element.value;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
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
      const otherRoomTypes = res.data.filter(v => v.id !== this.dialogData.element.id);

    });

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.dialogData.element.name }));
    this.dialogData.element.value = this.newCurrencyValue;

    this.closeDialog();
    //this.dialogData.table.renderRows();
  }

  delete() {
    this.dialog.open(CurrencyDeleteDialogComponent, {
      data: { ...this.dialogData, dialogRef: this.dialogRef },
    });
  }
}

