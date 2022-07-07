import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { RoomType } from "src/app/interfaces";
import { RoomTypeService } from "src/app/services";

interface DialogData {
  table: MatTable<RoomType>;
}

@Component({
  selector: 'app-room-type-add-dialog',
  templateUrl: './room-type-add-dialog.component.html',
  styleUrls: ['./room-type-add-dialog.component.scss']
})
export class RoomTypeAddDialogComponent implements OnInit {
  roomTypeName: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData, private dialogRef: MatDialogRef<RoomTypeAddDialogComponent>, private snackBar: MatSnackBar, private roomTypeService: RoomTypeService) { }

  ngOnInit(): void {
  }

  add() {
    const condition = this.roomTypeService.rooms.some(r => r.name.toLowerCase() === this.roomTypeName.toLowerCase());
    if (!this.roomTypeName) {
      this.snackBar.open("Please type the blank areas", "OK");
      this.clearInputs();
      return;
    }
    if (condition) {
      this.snackBar.open("Please type another room type name", "OK");
      this.clearInputs();
      return;
    }
    this.roomTypeService.addRoomType({
      name: this.roomTypeName,
      code: "3903232"
    });
    this.snackBar.open(`${this.roomTypeName} successfully added to your room type table.`);
    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  clearInputs() {
    this.roomTypeName = "";
  }
}
