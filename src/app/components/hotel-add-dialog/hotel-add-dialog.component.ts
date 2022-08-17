import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Hotel, HotelCategory } from 'src/app/interfaces';
import { HotelService } from 'src/app/services/hotel.service';
import { TranslocoService } from '@ngneat/transloco';
import { HotelCategoryService } from 'src/app/services';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { HotelFeatureService } from 'src/app/services/hotel-feature';

interface DialogData {
  table: MatTable<Hotel>;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  code: FormType<string>;
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
  hotelCategoryId: FormType<number>;
  hotelFeatureId: FormType<number>;
}

@Component({
  selector: 'app-hotel-add-dialog',
  templateUrl: './hotel-add-dialog.component.html',
  styleUrls: ['./hotel-add-dialog.component.scss']
})
export class HotelAddDialogComponent implements OnInit {
  hotelCode: string;
  hotelName: string;
  hotelPhone: string;
  hotelEmail: string;
  hotelAddress: string;
  hotelCategoryId: number;
  hotelFeatureId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HotelAddDialogComponent>,
    private hotelService: HotelService,
    public translocoService: TranslocoService,
    private hotelCategoryService: HotelCategoryService,
    private hotelFeatureService: HotelFeatureService
  ) { }

  hotelCategories: HotelCategory[] = [];
  hotelFeatures: HotelFeature[] = [];

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.hotelCategoryService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotelCategories = res.data
      else this.hotelCategories = []
    });

    this.hotelFeatureService.getAllFeatures().subscribe((res) => {
      if(res.data !== null) this.hotelFeatures = res.data;
      else this.hotelFeatures = [];
    })
  }

  add() {
    this.hotelPhone = String(this.hotelPhone);

    const predicate = (a: Omit<Hotel, 'id'>) =>
      a.code === this.hotelCode &&
      a.name === this.hotelName &&
      a.address === this.hotelAddress &&
      a.phone === this.hotelPhone &&
      a.hotelCategoryId === this.hotelCategoryId &&
      a.hotelFeatureId === this.hotelFeatureId &&
      a.email === this.emailControl.value;

    const condition = this.hotelService.hotels.some(predicate);

    this.hotelService.getAllHotels().subscribe((res) => {
      if (res.data.some(c => c.code === this.hotelCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel türü' }), "OK");
        this.hotelCode = "";
        return;
      }
    });

    if (this.hotelPhone.length != 11){
      this.snackBar.open(this.translocoService.translate('dialogs.error_phone'), "OK");
      return;
    }

    if (this.emailControl.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'));
      return;
    }

    if (!this.hotelCode || !this.hotelName || !this.hotelPhone|| !this.hotelAddress || !this.emailControl.value) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
      return;
    }
    if (this.emailControl.hasError('required')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
      return;
    }

    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Hotel' : 'Otel' }), 'OK');
      return;
    }



    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.hotelName }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {

    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.hotelCode,
        name: this.hotelName,
        phone: this.hotelPhone,
        email: this.emailControl.value,
        address: this.hotelAddress,
        hotelCategoryId: this.hotelCategoryId,
        hotelFeatureId: this.hotelFeatureId
      }
    });

  }
}
