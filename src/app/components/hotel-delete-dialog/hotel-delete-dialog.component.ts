import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Hotel } from "src/app/interfaces";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Hotel;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-delete-dialog',
  templateUrl: './hotel-delete-dialog.component.html',
  styleUrls: ['./hotel-delete-dialog.component.scss']
})
export class HotelDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.dialogRef.close();
    this.data.dialogRef.close();
  }

}
