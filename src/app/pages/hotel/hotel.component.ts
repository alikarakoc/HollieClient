import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { HotelAddDialogComponent, HotelDeleteDialogComponent, HotelUpdateDialogComponent } from "src/app/components";
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService, HotelService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  columns: string[] = ["code", "name", "address", "phone", "email", "hotelCategoryId","hotelFeatureId", "actions"];
  dataSource: MatTableDataSource<Hotel>;
  value = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Hotel>;
  @ViewChild(MatSort) sort: MatSort;
  checkButtonCount: number = 0;

  Hotel = 'ExcelSheet.xlsx';

  hotels: Hotel[] = [];
  hotelCategories: HotelCategory[] = [];
  hotelFeatures: HotelFeature[] = [];


  constructor(
    private cdr: ChangeDetectorRef,
    public hotelService: HotelService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelCategoryService: HotelCategoryService,
    private hotelFeatureService: HotelFeatureService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    const arrayToExport = this.hotels.map(h => {
      return {
        code: h.code,
        name: h.name,
        address: h.address,
        category: this.getCurrentCategory(h),
        feature: this.getCurrentFeature(h),
        phone: h.phone,
        email: h.email
      }
    })
    this.excelService.exportAsExcelFile(arrayToExport, 'Hotel');
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((res) => {
      if(res.data!=null){
         this.hotels = res.data;

      }

      this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data;
    });

    this.hotelFeatureService.getAllFeatures().subscribe(res => {
      this.hotelFeatures = res.data;
    });
  }

  filterHotels(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }


  getCurrentCategory(element: Hotel) {
    return this.hotelCategories.find(c => c.id === element.hotelCategoryId)?.name;
  }

  getCurrentFeature(element: Hotel) {
    let s  = this.hotelFeatures.find(c => c.id === element.hotelFeatureId);
    return "[ " + s?.babyTop + " - " + s?.childTop + " - " + s?.teenTop + " ]"
  }

  create() {
    if(this.checkButtonCount < 1 ) {
    const dialog = this.dialog.open(HotelAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.hotelService
          .addHotel(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });

  }
  this.checkButtonCount += 1;
}

  update(element: Hotel) {
    const dialog = this.dialog.open(HotelUpdateDialogComponent, { data: { element } });

    dialog.afterClosed().subscribe(result => {
      if (result.isUpdated) {
        this.hotelService.updateHotel(element).subscribe(() => this.ngOnInit());
      }
    });
  }

  delete(element: Hotel) {
    const dialog = this.dialog.open(HotelDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.hotelService.deleteHotel(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

}
