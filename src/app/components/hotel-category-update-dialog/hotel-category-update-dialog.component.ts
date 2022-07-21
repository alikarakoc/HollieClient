import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService } from "src/app/services";
import { HotelCategoryDeleteDialogComponent } from "../hotel-category-delete-dialog/hotel-category-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';

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
  newCategoryCode: string = this.data.element.code;

  sameCodeCheck = false;
  sameNameCheck = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelCategoryUpdateDialogComponent>,
    private hotelCategoryService: HotelCategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });
  }
  hotels: HotelCategory[] = [];

  update() {
    if (!this.newCategoryName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    // const otherHotelCategories = this.hotels.filter(c => c.name !== this.newCategoryName && c.code !== this.newCategoryCode);
    const otherHotelCategories = this.hotels;

    console.log(this.hotels);
    console.log(otherHotelCategories);


    if (otherHotelCategories.findIndex(c => c.name == this.newCategoryName.toString() || c.code == this.newCategoryCode.toString()) > -1) {
      { if (otherHotelCategories.some(c => c.name == this.newCategoryName && c.code == this.newCategoryCode )) {


          console.log(this.newCategoryName);
            this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel tipi' }), "OK");
            this.ngOnInit();
            return;

        }
        else{
          for (let i = 0; i < otherHotelCategories.length; i++){
            if(otherHotelCategories[i].code == this.newCategoryCode && otherHotelCategories[i].id != this.data.element.id){
              this.sameCodeCheck = true;
            }
            if(otherHotelCategories[i].name == this.newCategoryName && otherHotelCategories[i].id != this.data.element.id){
              this.sameNameCheck = true;
            }
          }
          if (this.sameCodeCheck || this.sameNameCheck){
            this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel tipi' }), "OK");
            this.ngOnInit();
            return;
          }
        }

        //   const [month, day, year] = value.birthdate.split('.');
        //   if(year > 2000){
        //     console.log(value.name + " " + value.surname);
        //   }
        // });



        otherHotelCategories.forEach(element => {
          if (element.name == this.newCategoryName || element.code == this.newCategoryCode) {
            console.log(this.newCategoryName);
            this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel tipi' }), "OK");
            this.ngOnInit();
            return;
          }
        });



      }

      this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newCategoryName }));
      this.dialogRef.close({ isUpdated: true });
      this.data.dialogRef?.close();
      this.data.element.name = this.newCategoryName;
      this.data.element.code = this.newCategoryCode;
      this.hotelCategoryService.updateCategory(this.data.element);
      console.log(this.data.element);
      this.data.table?.renderRows();
      this.closeDialog();
    }
    else {
      alert("Otel adı var");
    }

    // const otherCategories = this.hotels.map(v => {
    //   return (v.name !== this.data.element.name && v.code !== this.data.element.name) && v;
    // });

    // if (otherCategories) {

    // }
  }

  closeDialog() {
    this.dialogRef.close();

  }

  delete() {
    const dialog = this.dialog.open(HotelCategoryDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.hotelCategoryService.deleteCategory(this.data.element).subscribe(() => {
          this.ngOnInit();

        });
      } this.data.table?.renderRows();
    });
  }

}


