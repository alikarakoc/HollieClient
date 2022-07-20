import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Market } from "src/app/interfaces";
import { MarketService } from "src/app/services";
import { MarketDeleteDialogComponent } from "../market-delete-dialog/market-delete-dialog.component";

interface DialogData {
  element: Market;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-category-update-dialog',
  templateUrl: './market-update-dialog.component.html',
  styleUrls: ['./market-update-dialog.component.scss']
})
export class MarketUpdateDialogComponent implements OnInit {
  newMarketName: string = this.data.element.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MarketUpdateDialogComponent>,
    private marketService: MarketService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  update() {
    if (!this.newMarketName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.marketService.getAllMarkets().subscribe(res => {
      console.log(res.data);
      if (res.data.some(c => c.name === this.newMarketName)) {  
        console.log(this.newMarketName);
        this.snackBar.open("Please type another hotel category data.", "OK");
        this.newMarketName = "";
        return;
      }
    });

    this.snackBar.open(`${this.data.element.name} successfully updated.`);
    this.dialogRef.close({ isUpdated: true });
    this.data.dialogRef?.close();
    this.data.element.name = this.newMarketName;
    this.marketService.updateMarket(this.data.element);
    console.log(this.data.element);
    this.data.table?.renderRows();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(MarketDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });
  }

}
