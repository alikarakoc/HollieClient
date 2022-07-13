import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';
import { RoomTypeDeleteDialogComponent } from '..';

interface DialogData {
  element: RoomType;
  table: MatTable<any>;
}

@Component({
  selector: 'app-room-type-update-dialog',
  templateUrl: './room-type-update-dialog.component.html',
  styleUrls: ['./room-type-update-dialog.component.scss'],
})
export class RoomTypeUpdateDialogComponent implements OnInit {
  newType: string = this.dialogData.element.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<RoomTypeUpdateDialogComponent>,
    private snackBar: MatSnackBar,
    private roomTypeService: RoomTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  public get otherRoomTypes(): RoomType[] {
    const roomTypes = this.roomTypeService.rooms;
    const roomType = roomTypes.find((c) => c.name === this.newType);

    const index = roomTypes.indexOf(roomType!);

    const otherRoomTypes = roomTypes
      .slice(0, index)
      .concat(roomTypes.slice(index + 1, roomTypes.length));

    return otherRoomTypes;
  }

  updateRoomType() {
    const condition = this.otherRoomTypes.some(
      (r) => r.name === this.newType
    );
    if (!this.newType) {
      this.snackBar.open('Please type the blank areas', 'OK');
      return;
    }
    if (condition) {
      this.snackBar.open('Please type another room type name', 'OK');
      this.newType = '';
      return;
    }
    this.snackBar.open(
      `${this.dialogData.element.name} room type successfully updated to ${this.newType}`
    );
    // this.dialogData.element.name = this.newType;
    this.dialogData.table.renderRows();
    this.closeDialog();
  }

  delete() {
    this.dialog.open(RoomTypeDeleteDialogComponent, {
      data: { ...this.dialogData, dialogRef: this.dialogRef },
    });
  }
}
