import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {
  RoomTypeAddDialogComponent,
  RoomTypeDeleteDialogComponent,
  RoomTypeUpdateDialogComponent,
} from 'src/app/components';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss'],
})
export class RoomTypeComponent implements OnInit {
  columns: string[] = ['code','name', 'actions'];

  @ViewChild(MatTable) table: MatTable<RoomType>;
  roomTypes: RoomType[] = [];

  constructor(
    private dialog: MatDialog,
    public roomTypeService: RoomTypeService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.roomTypeService.getAllRoomTypes().subscribe((res) => {
      this.roomTypes = res.data;
    });
  }

  update(element: RoomType) {
    const dialog = this.dialog.open(RoomTypeUpdateDialogComponent, {
      data: { element, table: this.table },
    });

    dialog.afterClosed().subscribe(() => {
      this.roomTypeService.updateRoomType(element); /* .subscribe(); */
    });
  }

  createNewRoomType() {
    const dialog = this.dialog.open(RoomTypeAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.roomTypeService
          .addRoomType({ name: result.elementName })
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
