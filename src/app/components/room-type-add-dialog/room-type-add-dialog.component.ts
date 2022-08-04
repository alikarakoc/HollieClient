import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType } from 'src/app/interfaces';
import { RoomTypeService } from 'src/app/services';
import { TranslocoService } from '@ngneat/transloco';

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
  roomTypeCode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<RoomTypeAddDialogComponent>,
    private snackBar: MatSnackBar,
    private roomTypeService: RoomTypeService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  add() {
    if (!this.roomTypeName || !this.roomTypeCode) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), 'OK');
      this.clearInputs();
      return;
    }

    this.roomTypeService.getAllRoomTypes().subscribe((res) => {
      if (res.data !== null && res.data.some(c => c.code === this.roomTypeCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'room type' : 'oda tipi' }), 'OK');
        this.clearInputs();
        return;
      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.roomTypeName }));

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
      elementName: this.roomTypeName,
      elementCode: this.roomTypeCode
    });
  }

  clearInputs() {
    this.roomTypeName = '';
  }
}
