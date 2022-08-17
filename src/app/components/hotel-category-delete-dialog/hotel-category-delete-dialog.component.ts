import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Hotel, HotelCategory } from 'src/app/interfaces';
import { HotelCategoryService, HotelService } from "src/app/services";
import { CAgencyService } from 'src/app/services/cagency.service';
import { TranslocoService } from '@ngneat/transloco';

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
    // private hotelCategoryService: HotelCategoryService,
    private hotelService: HotelService,
    public translocoService: TranslocoService
  ) { }

  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });
  }

  delete() {
    const condition = this.hotels.some(h => h.hotelCategoryId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    // this.hotelCategoryService.deleteCategory(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
