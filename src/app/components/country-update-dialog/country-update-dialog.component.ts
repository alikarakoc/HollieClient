import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces';
import { CountryService } from 'src/app/services';
import { CountryDeleteDialogComponent } from '../country-delete-dialog/country-delete-dialog.component';

interface DialogData {
  element: Country;
}

@Component({
  selector: 'app-country-update-dialog',
  templateUrl: './country-update-dialog.component.html',
  styleUrls: ['./country-update-dialog.component.scss'],
})
export class CountryUpdateDialogComponent implements OnInit {
  newCountryName: string = this.data.element.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CountryUpdateDialogComponent>,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public get otherCountries(): Country[] {
    const countries = this.countryService.countries;
    const country = countries.find((c) => c.name === this.newCountryName);
    const index = countries.indexOf(country!);

    const otherCountries = countries
      .slice(0, index)
      .concat(countries.slice(index + 1, countries.length));

    return otherCountries;
  }

  update() {
    const condition = this.otherCountries.some(
      (c) => c.name === this.newCountryName
    );
    console.log(this.otherCountries);
    if (!this.newCountryName) {
      this.snackBar.open('Please type the blank areas', 'OK');
      return;
    }
    if (condition) {
      this.snackBar.open('Please type another country name', 'OK');
      this.newCountryName = '';
      return;
    }
    this.snackBar.open(
      `${this.data.element.name} successfully updated to ${this.newCountryName}`
    );
    // this.data.element.name = this.newCountryName;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(CountryDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef },
    });
  }
}
