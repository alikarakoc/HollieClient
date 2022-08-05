import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { HotelAddDialogComponent, HotelDeleteDialogComponent, HotelUpdateDialogComponent } from "src/app/components";
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService, HotelService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  columns: string[] = ["code", "name", "address", "phone", "email", "HotelCategoryId", "actions"];
  dataSource: MatTableDataSource<Hotel>;
  value = '';

  filterHotels(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable) table: MatTable<Hotel>;
  @ViewChild(MatSort) sort: MatSort;

  Hotel = 'ExcelSheet.xlsx';

  hotels: Hotel[] = [];
  hotelCategories: HotelCategory[] = [];


  constructor(
    public hotelService: HotelService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelCategoryService: HotelCategoryService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    const arrayToExport = this.hotels.map(h => {
      return {
        code: h.code,
        name: h.name,
        address: h.address,
        category: this.getCurrentCategory(h),
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
    });

    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data;
    });
  }

  getCurrentCategory(element: Hotel) {
    return this.hotelCategories.find(c => c.id === element.hotelCategoryId)?.name;
  }

  create() {
    console.log(this.hotels);

    const dialog = this.dialog.open(HotelAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.hotelService
          .addHotel(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });

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
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }

}
