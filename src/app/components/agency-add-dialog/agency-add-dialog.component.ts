import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';

interface DialogData {
  table: MatTable<Agency>;
}

type FormType<C> = FormControl<C | null>;

interface Phone {
  area: string;
  exchange: string;
  subscriber: string;
}

interface FormData {
  name: FormType<string>;
  address: FormType<string>;
  phone: FormType<string /* Phone */>;
  email: FormType<string>;
}

@Component({
  selector: 'app-agency-add-dialog',
  templateUrl: './agency-add-dialog.component.html',
  styleUrls: ['./agency-add-dialog.component.scss'],
})
export class AgencyAddDialogComponent implements OnInit {
  agencyName: string;
  agencyAddress: string;
  agencyPhone: string;
  agencyEmail: string;

  formGroup: FormGroup<FormData> = new FormGroup<FormData>({
    name: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgencyAddDialogComponent>,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void { }

  add() {
    const agency: Agency = {
      name: this.agencyName,
      address: this.agencyAddress,
      phone: this.agencyPhone,
      email: this.agencyEmail,
      code: '0',
    };
    const condition = this.agencyService.agencies.some((a) => a === agency);

    if (
      !this.agencyName ||
      !this.agencyAddress ||
      !this.agencyPhone ||
      !this.agencyEmail
    ) {
      this.snackBar.open('Please type the blank areas', 'OK');
      return;
    }

    if (condition) {
      this.snackBar.open('Please type another agency name', 'OK');
      return;
    }

    this.snackBar.open(
      `${this.agencyName} successfully added to your agency table.`
    );

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

/* For Telephone Input */