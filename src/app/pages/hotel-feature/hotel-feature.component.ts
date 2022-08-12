import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { HotelFeatureAddDialogComponent } from 'src/app/components/hotel-feature-add-dialog/hotel-feature-add-dialog.component';
import { HotelFeatureUpdateDialogComponent } from 'src/app/components/hotel-feature-update-dialog/hotel-feature-update-dialog.component';
import { HotelFeatureDeleteDialogComponent } from 'src/app/components/hotel-feature-delete-dialog/hotel-feature-delete-dialog.component';
import { HotelService } from 'src/app/services';
import { Hotel } from 'src/app/interfaces';

@Component({
  selector: 'app-hotel-feature',
  templateUrl: './hotel-feature.component.html',
  styleUrls: ['./hotel-feature.component.scss']
})

export class HotelFeatureComponent implements OnInit {
  columns: string[] = ['code', 'hotel', 'babyTop', 'childTop', 'teenTop', 'actions'];
  dataSource: MatTableDataSource<HotelFeature>;
  value: '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<HotelFeatureComponent>;
  checkButtonCount: number = 0;
  
  HotelFeature = 'ExcelSheet.xlsx';
  features: HotelFeature[] = [];
  hotels: Hotel[] = [];

  constructor(
    public hotelFeatureService: HotelFeatureService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService:ExcelService,
    private hotelService: HotelService
    ) { }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.features, 'HotelFeatures');
  }  

  ngOnInit(): void {
    this.hotelFeatureService.getAllFeatures().subscribe((res)=>{
      if(res.data != null){
        this.features = res.data;
      }

      this.dataSource = new MatTableDataSource<HotelFeature>(this.features);
      this.dataSource.sort = this.sort;
    });

    this.hotelService.getAllHotels().subscribe((res)=>{
      if(res.data != null){
        this.hotels = res.data;
      }
    });
  }

  filterCategories(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  create() {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(HotelFeatureAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.hotelFeatureService
          .addFeature({  
            code: result.code,
            hotelId : result.hotelId,
            babyTop: result.babyTop,
            childTop: result.childTop,
            teenTop: result.teenTop, })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;

  }

  update(element: HotelFeature) {
    const dialog = this.dialog.open(HotelFeatureUpdateDialogComponent, {
      data: { element , table : this.table },
    });

    dialog.afterClosed().subscribe(() => {
      this.hotelFeatureService.updateFeature(element).subscribe((res) => {
      
      });
    });
  }

  delete(element: HotelFeature) {
    const dialog = this.dialog.open(HotelFeatureDeleteDialogComponent, {
      data: { element , table:this.table},
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.hotelFeatureService.deleteFeature(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  getItem(type:  "hotel" , element: HotelFeature) {
    switch (type) {
      case 'hotel':
        return this.hotels.find(h => h.id === element.hotelId)?.name;
    }}



}