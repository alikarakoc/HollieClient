import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService, HotelService } from "src/app/services";
import { HotelDeleteDialogComponent } from "../hotel-delete-dialog/hotel-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  newHotelCode : string = this.data.element.code;
  newHotelCategoryId: number = this.data.element.hotelCategoryId;
  newHotelName: string = this.data.element.name;
  newHotelAddress: string = this.data.element.address;
  newHotelPhone: string = this.data.element.phone;
  newHotelEmail: string = this.data.element.email;


  sameCodeCheck = false;
  sameNameCheck = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelUpdateDialogComponent>,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
    , private hotelCategoryService: HotelCategoryService,
  ) { }

  emailControl = new FormControl('', [Validators.required,Validators.email]);

  hotelCategories: HotelCategory[] = []

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data;
    })
  }

  hotels: Hotel[] = [];

  update() {
    if (!this.newHotelCode || !this.newHotelAddress || !this.newHotelCategoryId || !this.emailControl.value || !this.newHotelName || !this.newHotelPhone) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    const otherHotelCode = this.hotels;
    const otherHotels = this.hotels.filter(c => c.code !== this.newHotelCode && c.name !== this.newHotelName && c.address !== this.newHotelAddress && c.phone !== this.newHotelPhone && c.email !== this.newHotelEmail && c.hotelCategoryId !== this.newHotelCategoryId);

    if (this.emailControl.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'));
      return;
    }
    if (this.newHotelPhone.length != 11){
      this.snackBar.open(this.translocoService.translate('dialogs.error_phone'), "OK");
      return;
    }

    if (otherHotels.findIndex(c =>c.code == this.newHotelCode.toString()) >-1){
      console.log(this.newHotelName);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.ngOnInit();
      return;

    }
    if (otherHotels.some(c => c.code === this.newHotelCode && c.name === this.newHotelName && c.address === this.newHotelAddress && c.phone === this.newHotelPhone && c.email === this.newHotelEmail)) {
      console.log(this.newHotelCode, this.newHotelName, this.newHotelEmail, this.newHotelPhone, this.newHotelAddress);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.newHotelCode = "";
      this.newHotelName = "";
      this.newHotelAddress = "";
      this.newHotelPhone = "";
      this.newHotelEmail = "";
      return;
    }


    console.log(this.newHotelCategoryId);

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newHotelName }));
    this.data.dialogRef?.close();
    this.data.element.code = this.newHotelCode;
    this.data.element.name = this.newHotelName;
    this.data.element.phone = this.newHotelPhone;
    this.data.element.email = this.emailControl.value!;
    this.data.element.address = this.newHotelAddress;
    this.data.element.hotelCategoryId = this.newHotelCategoryId;
    console.log(this.data.element);
    this.data.table?.renderRows();
    // this.hotelService.updateHotel(this.data.element)
    this.dialogRef.close({ isUpdated: true });
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
        this.hotelService.deleteHotel({ code: this.newHotelCode, name: this.newHotelName, address: this.newHotelAddress, phone: this.newHotelPhone, email: this.newHotelEmail, hotelCategoryId: this.newHotelCategoryId }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}

