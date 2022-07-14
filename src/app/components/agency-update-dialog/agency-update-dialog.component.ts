import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { AgencyDeleteDialogComponent } from '../agency-delete-dialog/agency-delete-dialog.component';

interface DialogData {
  element: Agency;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
}

@Component({
  selector: 'app-agency-update-dialog',
  templateUrl: './agency-update-dialog.component.html',
  styleUrls: ['./agency-update-dialog.component.scss'],
})
export class AgencyUpdateDialogComponent implements OnInit {
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
    private dialogRef: MatDialogRef<AgencyUpdateDialogComponent>,
    private agencyService: AgencyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  update() {
    const predicate = (a: Agency) =>
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

    const condition = this.agencyService.agencies.some(predicate);

    if (condition) {
      this.snackBar.open('Please type another agency data', 'OK');
      this.clearAreas();
      return;
    }

    if (controls.emailControl!.hasError('email')) {
      this.snackBar.open('Please type a valid email', 'OK');
      return;
    }

    for (const control of Object.values(controls)) {
      if (control.hasError('required')) {
        this.snackBar.open("Please type the blank areas", "OK");
        return;
      }
    }

    this.snackBar.open(`${this.data.element.name} successfully updated`);
    this.closeDialog();
  }

  clearAreas() {
    // this.formGroup.setValue({ name: '', address: '', email: '', phone: '' });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(AgencyDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef },
    });
  }
}
