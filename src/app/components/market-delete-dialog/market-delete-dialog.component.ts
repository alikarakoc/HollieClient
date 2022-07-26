import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {  Market,Contract } from 'src/app/interfaces';
import { MarketService,ContractService } from "src/app/services";

interface DialogData {
  element: Market;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-market-delete-dialog',
  templateUrl: './market-delete-dialog.component.html',
  styleUrls: ['./market-delete-dialog.component.scss'],
})
export class MarketDeleteDialogComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MarketDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private marketService: MarketService,
    public translocoService: TranslocoService,
    private contractService: ContractService

  ) { }

  contracts: Contract[];

  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data != null) this.contracts = res.data;
      else this.contracts = [];
    })
  }

  delete() {
    const condition = this.contracts.some(c => c.marketIds.some(m => m === this.data.element.id));

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success'));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.marketService.deleteMarket(this.data.element);
    console.log("deleted market");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}


