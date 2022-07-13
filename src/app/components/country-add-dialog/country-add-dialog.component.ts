import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from "@angular/material/table";
import { Country } from "src/app/interfaces";
import { CountryService } from 'src/app/services';

interface DialogData {
  table: MatTable<Country>;
}

@Component({
  selector: 'app-country-add-dialog',
  templateUrl: './country-add-dialog.component.html',
  styleUrls: ['./country-add-dialog.component.scss'],
})
export class CountryAddDialogComponent implements OnInit {
  countryName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CountryAddDialogComponent>,
    private countryService: CountryService
  ) { }

  ngOnInit(): void { }

  add() {
    const condition = this.countryService.countries.some(c => c.name === this.countryName);
    if (!this.countryName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }
    if (condition) {
      this.snackBar.open("Please type another country name", "OK");
      return;
    }
    // this.countryService.addNewCountry({
    //   name: this.countryName,
    //   code: "434"
    // });
    this.snackBar.open(`${this.countryName} successfully added to your country table.`);
    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
