import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Country} from 'src/app/interfaces';
import { CountryService } from 'src/app/services';
import { CountryDeleteDialogComponent } from '../country-delete-dialog/country-delete-dialog.component';
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Country;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;

}

@Component({
  selector: 'app-country-update-dialog',
  templateUrl: './country-update-dialog.component.html',
  styleUrls: ['./country-update-dialog.component.scss'],
})
export class CountryUpdateDialogComponent implements OnInit {
  newCountryName: string = this.data.element.name;
  newCategoryCode: string = this.data.element.code;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CountryUpdateDialogComponent>,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { this.countryService.getAllCountries().subscribe(res => {
    this.countries = res.data;
  });
  
  }
  countries: Country[] =[];
  update() {
    const condition = this.countryService.countries.some(
      (c) => c.name === this.newCountryName
    );
    if (!this.newCountryName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), 'OK');
      return;
    }
    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'country' : 'ülke' }), 'OK');
      this.newCountryName = '';
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.data.element.name }));
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
    this.dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.countryService.deleteCountry({ name: this.newCountryName, code: this.newCategoryCode }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });

  }
}
