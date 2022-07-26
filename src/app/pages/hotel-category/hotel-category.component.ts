import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {
  HotelCategoryAddDialogComponent,
  HotelCategoryDeleteDialogComponent,
  HotelCategoryUpdateDialogComponent,
} from 'src/app/components';
import { HotelCategory } from 'src/app/interfaces';
import { HotelCategoryService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-hotel-category',
  templateUrl: './hotel-category.component.html',
  styleUrls: ['./hotel-category.component.scss'],
})
export class HotelCategoryComponent implements OnInit {
  columns: string[] = ['code', 'name', 'actions'];
  @ViewChild(MatTable) table: MatTable<HotelCategoryComponent>;

  HotelCategory= 'ExcelSheet.xlsx';

  hotels: HotelCategory[] = [];
  // hotel: HotelCategory = {
  //   id: '',
  //   name: ''
  // };

  constructor(
    public hotelCategoryService: HotelCategoryService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService:ExcelService
  ) { }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.hotels, 'HotelCategory');
  }

  ngOnInit(): void {
    this.hotelCategoryService.getAllHotels().subscribe((res) => {
      this.hotels = res.data;
    });
    console.log('on init');
  }

  create() {
    const dialog = this.dialog.open(HotelCategoryAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.hotelCategoryService
          .addCategory({ name: result.elementName, code: result.elementCode })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  update(element: HotelCategory) {
    const dialog = this.dialog.open(HotelCategoryUpdateDialogComponent, {
      data: { element },
    });

    dialog.afterClosed().subscribe(() => {
      this.hotelCategoryService.updateCategory(element).subscribe((res) => {
        // this.hotel.name = element.name;
        // this.hotel.id = element.id;
        console.log('res data checked');
        console.log(res.data);
      });
    });
  }

  delete(element: HotelCategory) {
    const dialog = this.dialog.open(HotelCategoryDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.hotelCategoryService.deleteCategory(element).subscribe((res) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }
}
