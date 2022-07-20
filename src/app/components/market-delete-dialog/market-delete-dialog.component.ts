import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import {  Market } from 'src/app/interfaces';
import { MarketService } from "src/app/services";

interface DialogData {
  element: Market;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-category-delete-dialog',
  templateUrl: './market-delete-dialog.component.html',
  styleUrls: ['./market-delete-dialog.component.scss'],
})
export class MarketDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MarketDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private marketService: MarketService
  ) { }

  ngOnInit(): void { }

  delete() {
    this.snackBar.open(`${this.data.element.name} successfully deleted.`);
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


