import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency, Hotel, HotelCategory } from 'src/app/interfaces';
import { HotelService } from 'src/app/services/hotel.service';
import { TranslocoService } from '@ngneat/transloco';
import { HotelCategoryService } from 'src/app/services';

interface DialogData {
  table: MatTable<Hotel>;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
  HotelCategoryId: FormType<number>;
}

@Component({
  selector: 'app-hotel-add-dialog',
  templateUrl: './hotel-add-dialog.component.html',
  styleUrls: ['./hotel-add-dialog.component.scss']
})
export class HotelAddDialogComponent implements OnInit {

  hotelName: string;
  hotelPhone: string;
  hotelEmail: string;
  hotelAddress: string;
  hotelCategoryId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HotelAddDialogComponent>,
    private hotelService: HotelService,
    public translocoService: TranslocoService,
    private hotelCategoryService: HotelCategoryService
  ) { }

  hotelCategories: HotelCategory[] = [];

  ngOnInit(): void {
    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data
    })
  }

  add() {

    const predicate = (a: Omit<Hotel, 'id'>) =>
      a.name === this.hotelName &&
      a.address === this.hotelAddress &&
      a.phone === this.hotelPhone &&
      a.hotelCategoryId === this.hotelCategoryId &&
      a.email === this.hotelEmail;

    const condition = this.hotelService.hotels.some(predicate);

    this.hotelService.getAllHotels().subscribe((res) => {
      // categories = res.data;
      if (res.data.some(c => c.name === this.hotelName)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel türü' }), "OK");
        this.hotelName = "";
        return;
      }
    });

    if (!this.hotelName || !this.hotelPhone || !this.hotelAddress || !this.hotelEmail) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
      return;
    }

    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Hotel' : 'Otel' }), 'OK');
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: name }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    console.log(this.hotelCategoryId);

    this.dialogRef.close({
      isAdded: true,
      element: {
        name: this.hotelName,
        phone: this.hotelPhone,
        email: this.hotelEmail,
        address: this.hotelAddress,
        HotelCategoryId: this.hotelCategoryId
      }
    });

  }
}
