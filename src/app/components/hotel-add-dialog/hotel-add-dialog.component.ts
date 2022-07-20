import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency, Hotel } from 'src/app/interfaces';
import { HotelService } from 'src/app/services/hotel.service';
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  table: MatTable<Hotel>;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
}

@Component({
  selector: 'app-hotel-add-dialog',
  templateUrl: './hotel-add-dialog.component.html',
  styleUrls: ['./hotel-add-dialog.component.scss']
})
export class HotelAddDialogComponent implements OnInit {
  formGroup: FormGroup<FormData> = new FormGroup<FormData>({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    address: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HotelAddDialogComponent>,
    private hotelService: HotelService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  add() {
    const { address, email, name, phone } = this.formGroup.value;

    const controls = {
      nameControl: this.formGroup.controls.name,
      emailControl: this.formGroup.controls.email,
      addressControl: this.formGroup.controls.email,
      phoneControl: this.formGroup.controls.phone,
    };

    const predicate = (a: Omit<Agency, 'id'>) =>
      a.name === name &&
      a.address === address &&
      a.phone === phone &&
      a.email === email;

    const condition = this.hotelService.hotels.some(predicate);

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

    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Hotel' : 'Otel' }), 'OK');
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: name }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
