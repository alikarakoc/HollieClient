import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Country } from "src/app/interfaces";
import { CountryService } from "src/app/services";

interface DialogData {
  element: Country;
}

@Component({
  selector: 'app-country-update-dialog',
  templateUrl: './country-update-dialog.component.html',
  styleUrls: ['./country-update-dialog.component.scss']
})
export class CountryUpdateDialogComponent implements OnInit {
  newCountryName: string = this.data.element.name;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<CountryUpdateDialogComponent>, private countryService: CountryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  update() {
    const condition = this.countryService.countries.some(c => c.name === this.newCountryName);
    if (!this.newCountryName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }
    if (condition) {
      this.snackBar.open("Please type another country name", "OK");
      this.newCountryName = "";
      return;
    }
    this.snackBar.open(`${this.data.element.name} successfully updated to ${this.newCountryName}`);
    this.data.element.name = this.newCountryName;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
