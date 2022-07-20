import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from "@angular/material/table";
import { Country } from "src/app/interfaces";
import { CountryService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';

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
    private countryService: CountryService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  add() {
    const condition = this.countryService.countries.some(c => c.name === this.countryName);
    if (!this.countryName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'country' : 'ülke' }), "OK");
      this.countryName = "";
      return;
    }
    // this.countryService.addNewCountry({
    //   name: this.countryName,
    //   code: "434"
    // });
    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.countryName }));
    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
