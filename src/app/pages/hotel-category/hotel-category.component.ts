import { AfterViewInit , Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  HotelCategoryAddDialogComponent,
  HotelCategoryDeleteDialogComponent,
  HotelCategoryUpdateDialogComponent,
} from 'src/app/components';
import { HotelCategory } from 'src/app/interfaces';
import { HotelCategoryService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-hotel-category',
  templateUrl: './hotel-category.component.html',
  styleUrls: ['./hotel-category.component.scss'],
})
export class HotelCategoryComponent implements OnInit {
  columns: string[] = ['code', 'name', 'actions'];
  dataSource: MatTableDataSource<HotelCategory>;

  value = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<HotelCategoryComponent>;
  checkButtonCount: number = 0;

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
      if(res.data!=null){
         this.hotels = res.data;
      }
     
      this.dataSource = new MatTableDataSource<HotelCategory>(this.hotels);
      this.dataSource.sort = this.sort;
    });
   
  }

  
  filterCategories(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }
  
  ngAfterViewInit(): void {
  }
  

  create() {
    if(this.checkButtonCount < 1) {
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
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;
}

  update(element: HotelCategory) {
    const dialog = this.dialog.open(HotelCategoryUpdateDialogComponent, {
      data: { element , table : this.table },
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
      data: { element , table:this.table},
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
