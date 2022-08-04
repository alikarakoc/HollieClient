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


    if (!this.marketCode || !this.marketName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.marketService.getMarket().subscribe((res) => {
      // categories = res.data;
      if (res.data !== null && res.data.some((c: { code: string; }) => c.code === this.marketCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: 'market' }), "OK");
        this.marketCode = "";
        this.marketName = "";
        return;

      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.marketName }));

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

