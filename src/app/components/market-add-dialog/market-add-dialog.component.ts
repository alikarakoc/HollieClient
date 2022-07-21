import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
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
  marketCode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MarketAddDialogComponent>,
    private marketService: MarketService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  add() {
    // let categories: HotelCategory[] = [];

    if (!this.marketName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.marketService.getMarket().subscribe((res: { data: { name: string; }[]; }) => {
      // categories = res.data;
      if (res.data.some((c: { name: string; }) => c.name === this.marketName)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: 'market' }), "OK");
        this.marketName = "";
        return;
        
      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success'));

    // O an...
    // this.hotelCategoryService.addCategory({ name: this.categoryName });

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.marketName,
      elementCode: this.marketCode
    });
  }

}

