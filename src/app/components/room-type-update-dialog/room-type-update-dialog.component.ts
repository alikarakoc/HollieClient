import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { RoomType } from "src/app/interfaces";
import { RoomTypeService } from "src/app/services";

interface DialogData {
  element: RoomType;
  table: MatTable<any>;
}

@Component({
  selector: 'app-room-type-update-dialog',
  templateUrl: './room-type-update-dialog.component.html',
  styleUrls: ['./room-type-update-dialog.component.scss']
})
export class RoomTypeUpdateDialogComponent implements OnInit {
  newType: string = this.dialogData.element.name;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData, private dialogRef: MatDialogRef<RoomTypeUpdateDialogComponent>, private snackBar: MatSnackBar, private roomTypeService: RoomTypeService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateRoomType() {
    const condition = this.roomTypeService.rooms.some(r => r.name === this.newType);
    if (!this.newType) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }
    if (condition) {
      this.snackBar.open("Please type another room type name", "OK");
      this.newType = "";
      return;
    }
    this.snackBar.open(`${this.dialogData.element.name} room type successfully updated to ${this.newType}`);
    this.dialogData.element.name = this.newType;
    this.dialogData.table.renderRows();
    this.closeDialog();
  }
}
