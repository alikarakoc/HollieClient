import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { HotelCategory } from 'src/app/interfaces';
import { HotelCategoryService } from "src/app/services";

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
    private snackBar: MatSnackBar,
    private hotelCategoryService: HotelCategoryService
  ) { }

  ngOnInit(): void { }

  delete() {
    this.snackBar.open(`${this.data.element.name} successfully deleted.`);
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.hotelCategoryService.deleteCategory(this.data.element);
    console.log("deleted category");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
