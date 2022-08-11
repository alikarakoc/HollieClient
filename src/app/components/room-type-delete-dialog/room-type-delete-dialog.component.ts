import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType, Contract } from 'src/app/interfaces';
import { CRoomType } from 'src/app/interfaces/croomtype';
import { TranslocoService } from '@ngneat/transloco';
import { RoomTypeService } from 'src/app/services';

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
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomTypeDeleteDialogComponent>,
    public translocoService: TranslocoService,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success'));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.roomTypeService.deleteRoomType(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
