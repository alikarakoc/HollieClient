import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Currency , Contract } from 'src/app/interfaces';
import { CurrencyService, ContractService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Currency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}


@Component({
  selector: 'app-currency-delete-dialog',
  templateUrl: './currency-delete-dialog.component.html',
  styleUrls: ['./currency-delete-dialog.component.scss']
})
export class CurrencyDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CurrencyDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private currencuService: CurrencyService,
    public translocoService: TranslocoService,
    private contractService: ContractService
  ) { }

  contracts: Contract[];

  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
    })
  }

  delete() {
    const condition = this.contracts.some(c => c.currencyId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    console.log("deleted currency");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }

}
