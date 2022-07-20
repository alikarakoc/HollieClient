import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel } from 'src/app/interfaces';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelDeleteDialogComponent } from '../hotel-delete-dialog/hotel-delete-dialog.component';
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Hotel;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
}

@Component({
  selector: 'app-hotel-update-dialog',
  templateUrl: './hotel-update-dialog.component.html',
  styleUrls: ['./hotel-update-dialog.component.scss'],
})
export class HotelUpdateDialogComponent implements OnInit {
  formGroup: FormGroup<FormData> = new FormGroup<FormData>({
    name: new FormControl<string>(this.data.element.name, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    address: new FormControl<string>(this.data.element.address, [
      Validators.required,
      Validators.maxLength(200),
    ]),
    phone: new FormControl<string>(this.data.element.phone, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    email: new FormControl<string>(this.data.element.email, [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelUpdateDialogComponent>,
    private hotelService: HotelService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  update() {
    const predicate = (a: Hotel) =>
      a.name === this.formGroup.value.name &&
      a.address === this.formGroup.value.address &&
      a.phone === this.formGroup.value.phone &&
      a.email === this.formGroup.value.email;

    const controls = {
      nameControl: this.formGroup.controls.name,
      emailControl: this.formGroup.controls.email,
      addressControl: this.formGroup.controls.email,
      phoneControl: this.formGroup.controls.phone,
    };

    const condition = this.hotelService.hotels.some(predicate);

    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), 'OK');
      this.clearAreas();
      return;
    }

    if (controls.emailControl!.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'), 'OK');
      return;
    }

    for (const control of Object.values(controls)) {
      if (control.hasError('required')) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_required'), 'OK');
        return;
      }
    }

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.data.element.name }));
    this.closeDialog();
  }

  clearAreas() {
    // this.formGroup.setValue({ name: '', address: '', email: '', phone: '' });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(HotelDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef },
    });
  }
}
