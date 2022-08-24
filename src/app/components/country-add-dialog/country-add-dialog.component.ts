import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from "@angular/material/table";
import { Country } from "src/app/interfaces";
import { CountryService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { FormControl } from '@angular/forms';

interface DialogData {
  table: MatTable<Country>;
}
type FormType<C> = FormControl<C | null>;

interface FormData {
  code: FormType<string>;
  name: FormType<string>;

}

@Component({
  selector: 'app-country-add-dialog',
  templateUrl: './country-add-dialog.component.html',
  styleUrls: ['./country-add-dialog.component.scss'],
})
export class CountryAddDialogComponent implements OnInit {
  countryName: string;
  countryCode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CountryAddDialogComponent>,
    private countryService: CountryService,
    public translocoService: TranslocoService
  ) { }

  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(res => {
      if (res.data !== null) this.countries = res.data;
      else this.countries = [];
    });
  }

  add() {

    if (this.countries.some(c => c.code === this.countryCode || c.name === this.countryName)) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel türü' }), "OK");
      this.countryCode = "";
      this.countryName = "";
      return;

    }

    if (!this.countryCode || !this.countryName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.countryName }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.countryCode,
        name: this.countryName,
        createdUser : localStorage.getItem("username")
      }
    });
  }

}

