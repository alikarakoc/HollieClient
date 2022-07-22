import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Country } from "src/app/interfaces";
import { CountryService } from "src/app/services";
import { CountryDeleteDialogComponent } from "../country-delete-dialog/country-delete-dialog.component";
import { TranslocoService } from "@ngneat/transloco";
interface DialogData {
  element: Country;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-country-update-dialog',
  templateUrl: './country-update-dialog.component.html',
  styleUrls: ['./country-update-dialog.component.scss']
})
export class CountryUpdateDialogComponent implements OnInit {
  newCountryName: string = this.data.element.name;
  newCountryCode: string = this.data.element.code;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CountryUpdateDialogComponent>,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(res => {
      this.countries = res.data;
    });
  }
  countries: Country[] = [];

  update() {
    if (!this.newCountryName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    const otherCountries = this.countries.filter(c => c.code !== this.newCountryCode && c.name !== this.newCountryName);

    if (otherCountries.some(c => c.code === this.newCountryCode && c.name === this.newCountryName )) {
      console.log(this.newCountryCode, this.newCountryName);
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.newCountryCode = "";
      this.newCountryName = "";
      
      return;
    }

    

    this.snackBar.open(this.translocoService.translate('dialogs.update_success'));
    this.data.dialogRef?.close();
    this.data.element.code = this.newCountryCode;
    this.data.element.name = this.newCountryName;
   
    console.log(this.data.element);
    this.data.table?.renderRows();
    // this.hotelService.updateHotel(this.data.element)
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();

  }

  delete() {
    const dialog = this.dialog.open(CountryDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.countryService.deleteCountry(this.data.element ).subscribe(() => {
          this.ngOnInit();
        });
      }this.data.table?.renderRows();
    });
  }

}

