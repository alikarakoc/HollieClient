import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';

interface DialogData {
  element: RoomType;
  table: MatTable<any>;
}

@Component({
  selector: 'app-room-type-delete-dialog',
  templateUrl: './room-type-delete-dialog.component.html',
  styleUrls: ['./room-type-delete-dialog.component.scss'],
})
export class RoomTypeDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private roomTypeService: RoomTypeService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomTypeDeleteDialogComponent>
  ) {}

  ngOnInit(): void {}

  delete() {
    this.snackBar.open(`${this.data.element.name} successfully deleted.`);
    this.roomTypeService.deleteRoomType(this.data.element);
    this.dialogRef.close();
    this.data.table.renderRows();
  }
}
