import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Hotel } from "src/app/interfaces";
import { HotelService } from "src/app/services";
import { HotelDeleteDialogComponent } from "../hotel-delete-dialog/hotel-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Hotel;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-update-dialog',
  templateUrl: './hotel-update-dialog.component.html',
  styleUrls: ['./hotel-update-dialog.component.scss']
})
export class HotelUpdateDialogComponent implements OnInit {
  newHotelName: string = this.data.element.name;
  newHotelAddress: string = this.data.element.address;
  newHotelPhone: string = this.data.element.phone;
  newHotelEmail: string = this.data.element.email;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelUpdateDialogComponent>,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });
  }

  hotels: Hotel[] = [];

  update() {
    if (!this.newHotelName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    if (this.hotels.some(c => c.name === this.newHotelName)) {
      console.log(this.newHotelName);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel tipi' }), "OK");
      this.newHotelName = "";
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.update_success'));
    this.dialogRef.close({ isUpdated: true });
    this.data.dialogRef?.close();
    this.data.element.name = this.newHotelName;
    this.hotelService.updateHotel(this.data.element);
    console.log(this.data.element);
    this.data.table?.renderRows();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    const dialog = this.dialog.open(HotelDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.hotelService.deleteHotel({ name: this.newHotelName }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}

