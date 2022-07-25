import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {  Contract } from 'src/app/interfaces';
import { ContractService } from "src/app/services";

interface DialogData {
  element: Contract;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-contract-delete-dialog',
  templateUrl: './contract-delete-dialog.component.html',
  styleUrls: ['./contract-delete-dialog.component.scss']
})
export class ContractDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ContractDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private contractService: ContractService,
    public translocoService: TranslocoService
  ) { }

  
  ngOnInit(): void {
  }

  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success'));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.contractService.deleteContract(this.data.element);
    console.log("deleted contract");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
