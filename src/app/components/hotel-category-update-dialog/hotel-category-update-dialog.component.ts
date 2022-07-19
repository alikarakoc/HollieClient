import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { HotelCategory } from "src/app/interfaces";
import { HotelCategoryService } from "src/app/services";
import { HotelCategoryDeleteDialogComponent } from "../hotel-category-delete-dialog/hotel-category-delete-dialog.component";

interface DialogData {
  element: HotelCategory;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-category-update-dialog',
  templateUrl: './hotel-category-update-dialog.component.html',
  styleUrls: ['./hotel-category-update-dialog.component.scss']
})
export class HotelCategoryUpdateDialogComponent implements OnInit {
  newCategoryName: string = this.data.element.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelCategoryUpdateDialogComponent>,
    private hotelCategoryService: HotelCategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  update() {
    if (!this.newCategoryName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      console.log(res.data);
      if (res.data.some(c => c.name === this.newCategoryName)) {  
        console.log(this.newCategoryName);
        this.snackBar.open("Please type another hotel category data.", "OK");
        this.newCategoryName = "";
        return;
      }
    });

    this.snackBar.open(`${this.data.element.name} successfully updated.`);
    this.dialogRef.close({ isUpdated: true });
    this.data.dialogRef?.close();
    this.data.element.name = this.newCategoryName;
    this.hotelCategoryService.updateCategory(this.data.element);
    console.log(this.data.element);
    this.data.table?.renderRows();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(HotelCategoryDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });
  }

}
