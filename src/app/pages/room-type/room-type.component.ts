import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  RoomTypeAddDialogComponent,
  RoomTypeDeleteDialogComponent,
  RoomTypeUpdateDialogComponent,
} from 'src/app/components';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss'],
})
export class RoomTypeComponent implements OnInit {
  columns: string[] = ['code', 'name', 'actions'];
  dataSource: MatTableDataSource<RoomType>;

  value =  '';

  @ViewChild(MatTable) table: MatTable<RoomType>;
  @ViewChild(MatSort) sort: MatSort;

  RoomType = 'ExcelSheet.xlsx';

  roomTypes: RoomType[] = [];


  constructor(
    private dialog: MatDialog,
    public roomTypeService: RoomTypeService,
    public translocoService: TranslocoService,
    private excelService: ExcelService
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
    });
  }

  
  filterRoomTypes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  update(element: RoomType) {
    const dialog = this.dialog.open(RoomTypeUpdateDialogComponent, {
      data: { element, table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.roomTypeService
          .updateRoomType(element)
          .subscribe(() => {
            console.log(element);

            this.ngOnInit();
          });
      }
    });
  }

  createNewRoomType() {
    const dialog = this.dialog.open(RoomTypeAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.roomTypeService
          .addRoomType({ name: result.elementName, code: result.elementCode })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  delete(element: RoomType) {
    const dialog = this.dialog.open(RoomTypeDeleteDialogComponent, {
      data: { element, table: this.table },
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
