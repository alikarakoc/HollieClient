import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { HotelCategory } from "src/app/interfaces";
import { HotelCategoryService } from "src/app/services";

interface DialogData {
  table: MatTable<HotelCategory>;
}

@Component({
  selector: 'app-hotel-category-add-dialog',
  templateUrl: './hotel-category-add-dialog.component.html',
  styleUrls: ['./hotel-category-add-dialog.component.scss']
})
export class HotelCategoryAddDialogComponent implements OnInit {
  categoryName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HotelCategoryAddDialogComponent>,
    private hotelCategoryService: HotelCategoryService
  ) { }

  ngOnInit(): void {
  }

  add() {
    let categories: HotelCategory[] = [];
    this.hotelCategoryService.getAllHotels().subscribe(data => {
      categories = data.data;
      console.log("Categories initialized");
      console.log(data);
    });

    console.log(categories);

    if (!this.categoryName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    if (categories.some(c => c.name === this.categoryName)) {
      this.snackBar.open("Please type another hotel category name", "OK");
      this.categoryName = "";
      return;
    }

    this.snackBar.open(`${this.categoryName} successfully added to your table.`);

    // O an...
    this.hotelCategoryService.addCategory({ name: this.categoryName });

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
