import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: RoomType;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
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
    private dialogRef: MatDialogRef<RoomTypeDeleteDialogComponent>,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    // this.roomTypeService.deleteRoomType(this.data.element);
    this.dialogRef.close();
    this.data.dialogRef.close();
    this.data.table.renderRows();
  }
}
