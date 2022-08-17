import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Country } from 'src/app/interfaces';
import { TranslocoService } from '@ngneat/transloco';
import { CountryService } from "src/app/services";

interface DialogData {
  element: Country;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-country-delete-dialog',
  templateUrl: './country-delete-dialog.component.html',
  styleUrls: ['./country-delete-dialog.component.scss'],
})
export class CountryDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private updateDialogRef: MatDialogRef<CountryUpdateDialogComponent>,
    private dialogRef: MatDialogRef<CountryDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success'));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.countryService.deleteCountry(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
