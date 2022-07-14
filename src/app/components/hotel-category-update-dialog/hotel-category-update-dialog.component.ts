import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HotelCategory } from "src/app/interfaces";
import { HotelCategoryService } from "src/app/services";
import { HotelCategoryDeleteDialogComponent } from "../hotel-category-delete-dialog/hotel-category-delete-dialog.component";

interface DialogData {
  element: HotelCategory;
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

  predicate = (c: HotelCategory) => c.name === this.newCategoryName;

  public get otherCategories(): HotelCategory[] {
    const categories = this.hotelCategoryService.categories;
    const category = categories.find(this.predicate);
    const index = categories.indexOf(category!);

    return categories
      .slice(0, index)
      .concat(categories.slice(index + 1, categories.length));
  }

  update() {
    const condition = this.otherCategories.some(this.predicate);

    if (condition) {
      this.snackBar.open("Please type another hotel category data.", "OK");
      this.newCategoryName = "";
      return;
    }

    if (!this.newCategoryName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.snackBar.open(`${this.data.element.name} successfully update`);
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
