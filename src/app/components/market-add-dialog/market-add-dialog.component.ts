import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Market } from "src/app/interfaces";
import { MarketService } from "src/app/services";

interface DialogData {
  table: MatTable<Market>;
}

@Component({
  selector: 'app-market-add-dialog',
  templateUrl: './market-add-dialog.component.html',
  styleUrls: ['./market-add-dialog.component.scss']
})
export class MarketAddDialogComponent implements OnInit {
  marketName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MarketAddDialogComponent>,
    private marketService: MarketService
  ) { }

  ngOnInit(): void {
  }

  add() {
    // let categories: HotelCategory[] = [];

    if (!this.marketName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.marketService.getMarket().subscribe((res: { data: { name: string; }[]; }) => {
      // categories = res.data;
      if (res.data.some((c: { name: string; }) => c.name === this.marketName)) {
        this.snackBar.open("Please type another market name", "OK");
        this.marketName = "";
        return;
        
      }
    });

    this.snackBar.open(`${this.marketName} successfully added to your table.`);

    // O an...
    // this.hotelCategoryService.addCategory({ name: this.categoryName });

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.marketName
    });
  }

}

