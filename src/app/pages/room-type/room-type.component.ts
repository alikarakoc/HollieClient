import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  RoomTypeAddDialogComponent,
  RoomTypeDeleteDialogComponent,
  RoomTypeUpdateDialogComponent,
} from 'src/app/components';
import { Hotel, RoomType } from 'src/app/interfaces';
import { HotelService, RoomTypeService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss'],
})
export class RoomTypeComponent implements OnInit {
  columns: string[] = ['code', 'name', 'hotelId', 'maxAD', 'maxCH', 'pax', 'actions'];
  dataSource: MatTableDataSource<RoomType>;

  value =  '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<RoomType>;
  @ViewChild(MatSort) sort: MatSort;

  RoomType = 'ExcelSheet.xlsx';

  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];
  checkButtonCount: number = 0;


  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public roomTypeService: RoomTypeService,
    public translocoService: TranslocoService,
    private excelService: ExcelService,
    private hotelService: HotelService
  ) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.roomTypes, 'RoomType');
  }

  ngOnInit(): void {
    // this.translocoService.selectTranslation('ENG').subscribe(translation => 'TR');    bu dursun çalışacağım üzerinde
    this.roomTypeService.getAllRoomTypes().subscribe((res) => {
      if (res.data!=null){
          this.roomTypes = res.data;
      }
      this.dataSource = new MatTableDataSource(this.roomTypes);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });

    this.hotelService.getAllHotels().subscribe((res) =>{
      if (res.data!=null){
        this.hotels = res.data;
    }
    })
  }


  filterRoomTypes(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  update(element: RoomType) {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(RoomTypeUpdateDialogComponent, {
      data: { element, table: this.table, hotels: this.hotels },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.roomTypeService
          .updateRoomType(element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }
}

  createNewRoomType() {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(RoomTypeAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        if(this.checkButtonCount > 0) {
          this.checkButtonCount = 0;
        }
        this.roomTypeService
          .addRoomType({
            name: result.name,
            code: result.code,
            hotelId: result.hotelId,
            maxAD: result.maxAD,
            maxCH: result.maxCH,
            pax: result.pax,
          })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
      this.checkButtonCount = 0;
    });
  }
  this.checkButtonCount += 1;
  }

  delete(element: RoomType) {
    if(this.checkButtonCount < 1) {
    const dialog = this.dialog.open(RoomTypeDeleteDialogComponent, {
      data: { element, table: this.table},
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.roomTypeService
          .deleteRoomType(element)
          .subscribe(() => this.ngOnInit());
      }
    });
  }
  }

  getItem(type:  "hotel" , element: RoomType) {
    switch (type) {
      case 'hotel':
          return this.hotels.find(h => h.id === element.hotelId)?.name;
    }
  }
}




