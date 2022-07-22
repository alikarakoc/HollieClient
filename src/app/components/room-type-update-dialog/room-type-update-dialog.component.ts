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
import { TranslocoService } from '@ngneat/transloco';

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
  newCode: string = this.dialogData.element.code;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<RoomTypeUpdateDialogComponent>,
    private snackBar: MatSnackBar,
    private roomTypeService: RoomTypeService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close({
      isUpdated: true
    });
  }

  updateRoomType() {
    if (!this.newType) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), 'OK');
      return;
    }

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      const otherRoomTypes = res.data.filter(v => v.code !== this.newCode);
      if (otherRoomTypes.some(c => c.code === this.newCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === "en" ? "room type" : "oda tipi" }), "OK");
        this.newType = "";
        this.newCode = "";
        return;
      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.dialogData.element.name }));
    this.dialogData.element.name = this.newType;
    this.dialogData.element.code = this.newCode;
    this.closeDialog();
    this.dialogData.table.renderRows();
  }

  delete() {
    this.dialog.open(RoomTypeDeleteDialogComponent, {
      data: { ...this.dialogData, dialogRef: this.dialogRef },
    });
  }
}
