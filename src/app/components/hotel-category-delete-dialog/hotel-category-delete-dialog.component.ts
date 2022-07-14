import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { HotelCategory } from 'src/app/interfaces';

interface DialogData {
  element: HotelCategory;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-category-delete-dialog',
  templateUrl: './hotel-category-delete-dialog.component.html',
  styleUrls: ['./hotel-category-delete-dialog.component.scss'],
})
export class HotelCategoryDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelCategoryDeleteDialogComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  delete() {
    this.snackBar.open(`${this.data.element.name} successfully deleted.`);
    this.dialogRef.close();
    this.data.dialogRef.close();
  }
}
