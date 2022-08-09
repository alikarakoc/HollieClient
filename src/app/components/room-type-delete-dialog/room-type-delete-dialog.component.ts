import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType, Contract } from 'src/app/interfaces';
import { CRoomType } from 'src/app/interfaces/croomtype';
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
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomTypeDeleteDialogComponent>,
    public translocoService: TranslocoService,
  ) { }
  croomtype: CRoomType[];

  ngOnInit(): void {

  }

  delete() {
    const condition = this.croomtype.some(c => c.roomTypeId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    // this.roomTypeService.deleteRoomType(this.data.element);
    this.dialogRef.close({ isDeleted: true });
    this.data.dialogRef.close();
    this.data.table.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
