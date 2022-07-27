import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import { Market } from "src/app/interfaces";
import { MarketService } from "src/app/services";
import { MarketDeleteDialogComponent } from "../market-delete-dialog/market-delete-dialog.component";

interface DialogData {
  element: Market;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-market-update-dialog',
  templateUrl: './market-update-dialog.component.html',
  styleUrls: ['./market-update-dialog.component.scss']
})
export class MarketUpdateDialogComponent implements OnInit {

  newMarketName: string = this.data.element.name;
  newMarketCode: string = this.data.element.code;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MarketUpdateDialogComponent>,
    private marketService: MarketService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });
  }
  markets: Market[] = [];

  update() {
    if (!this.newMarketName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.marketService.getAllMarkets().subscribe(res => {
      const otherMarkets = res.data.filter(v => v.id !== this.data.element.id);

      if (otherMarkets.some(c => c.code === this.newMarketCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === "en" ? "room type" : "oda tipi" }), "OK");
        this.newMarketName = "";
        this.newMarketCode = "";
        return;
      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.update_success'));
    this.data.dialogRef?.close();
    this.data.element.code = this.newMarketCode;
    this.data.element.name = this.newMarketName;

    console.log(this.data.element);
    this.data.table?.renderRows();
    // this.hotelService.updateHotel(this.data.element)
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    const dialog = this.dialog.open(MarketDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.marketService.deleteMarket({ code: this.newMarketCode, name: this.newMarketName }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}

