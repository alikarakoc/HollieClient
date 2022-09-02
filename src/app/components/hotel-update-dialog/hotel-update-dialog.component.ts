import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService, HotelService } from "src/app/services";
import { HotelDeleteDialogComponent } from "../hotel-delete-dialog/hotel-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';

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
  newHotelFeatureId: number = this.data.element.hotelFeatureId;
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
    public translocoService: TranslocoService, 
    private hotelCategoryService: HotelCategoryService,
    private hotelFeatureService: HotelFeatureService
  ) { }

  emailControl = new FormControl(this.newHotelEmail, [Validators.required,Validators.email]);

  hotelCategories: HotelCategory[] = []
  hotelFeatures: HotelFeature[] = [];
  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data;
    });

    this.hotelFeatureService.getAllFeatures().subscribe((res) => {
      this.hotelFeatures = res.data;
    })
  }


  update() {
    if (!this.newHotelCode ) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    const otherHotels = this.hotels.filter(c => 
      c.code !== this.newHotelCode && 
      c.name !== this.newHotelName && 
      c.address !== this.newHotelAddress && 
      c.phone !== this.newHotelPhone && 
      c.email !== this.newHotelEmail && 
      c.hotelCategoryId !== this.newHotelCategoryId &&
      c.hotelFeatureId !== this.newHotelFeatureId);

    if (this.emailControl.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'));
      return;
    }
    if (this.newHotelPhone.length != 11){
      this.snackBar.open(this.translocoService.translate('dialogs.error_phone'), "OK");
      return;
    }

    if (otherHotels.findIndex(c =>c.code == this.newHotelCode.toString()) >-1){
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.ngOnInit();
      return;

    }
    if (otherHotels.some(c => 
      c.code === this.newHotelCode && 
      c.name === this.newHotelName && 
      c.address === this.newHotelAddress && 
      c.phone === this.newHotelPhone && 
      c.email === this.newHotelEmail)) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.newHotelCode = "";
      this.newHotelName = "";
      this.newHotelAddress = "";
      this.newHotelPhone = "";
      this.newHotelEmail = "";
      return;
    }



    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newHotelName }));
    this.data.dialogRef?.close();
    this.data.element.code = this.newHotelCode;
    this.data.element.name = this.newHotelName;
    this.data.element.phone = this.newHotelPhone;
    this.data.element.email = this.emailControl.value!;
    this.data.element.address = this.newHotelAddress;
    this.data.element.hotelCategoryId = this.newHotelCategoryId;
    this.data.element.hotelFeatureId = this.newHotelFeatureId;
    this.data.element.updatedUser = localStorage.getItem("username") + "";


    this.data.table?.renderRows();
    // this.hotelService.updateHotel(this.data.element)
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();

  }


}

