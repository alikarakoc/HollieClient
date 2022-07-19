import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';

interface DialogData {
  table: MatTable<RoomType>;
}

@Component({
  selector: 'app-room-type-add-dialog',
  templateUrl: './room-type-add-dialog.component.html',
  styleUrls: ['./room-type-add-dialog.component.scss'],
})
export class RoomTypeAddDialogComponent implements OnInit {
  roomTypeName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<RoomTypeAddDialogComponent>,
    private snackBar: MatSnackBar,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void { }

  add() {
    if (!this.roomTypeName) {
      this.snackBar.open('Please type the blank areas', 'OK');
      this.clearInputs();
      return;
    }

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      if (res.data.some(c => c.name === this.roomTypeName)) {
        this.snackBar.open('Please type another room type name', 'OK');
        this.clearInputs();
        return;
      }
    });

    this.snackBar.open(`${this.roomTypeName} successfully added to your table.`);

    this.closeDialog();
    this.data.table.renderRows();

    // this.roomTypeService.addRoomType({
    //   name: this.roomTypeName,
    //   code: "3903232"
    // });
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.roomTypeName
    });
  }

  clearInputs() {
    this.roomTypeName = '';
  }
}
