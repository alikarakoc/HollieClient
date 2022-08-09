import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Hotel, RoomType } from "src/app/interfaces";1
import { Room } from "src/app/interfaces/room";
import { RoomTypeService , HotelService } from "src/app/services";
import { RoomService } from "src/app/services/room.service";
import { RoomDeleteDialogComponent } from "../room-delete-dialog/room-delete-dialog.component";
import { TranslocoService } from '@ngneat/transloco';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface DialogData {
  element: Room;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-room-update-dialog',
  templateUrl: './room-update-dialog.component.html',
  styleUrls: ['./room-update-dialog.component.scss']
})
export class RoomUpdateDialogComponent implements OnInit {
  newRoomCode : string = this.data.element.code;
  newRoomTypeId: number = this.data.element.roomTypeId;
  newHotelId: number = this.data.element.hotelId;
  newRoomName: string = this.data.element.name;
  newRoomBed: string = this.data.element.bed;
  newRoomSlot: number = this.data.element.slot


  sameCodeCheck = false;
  sameNameCheck = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<RoomUpdateDialogComponent>,
    private roomService: RoomService,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
    , private RoomTypeService: RoomTypeService,
  ) { }

  roomTypes: RoomType[] = []
  rooms: Room[] = [];
  hotels: Hotel[] = []

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(res => {
      this.rooms = res.data;
    });

    this.RoomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;
    });

    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    })
  }


  update() {
    if (!this.newRoomName || !this.newRoomCode || !this.newRoomBed || !this.newRoomSlot) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    const otherRoomCode = this.rooms;
    const otherRooms = this.rooms.filter(c => c.code !== this.newRoomCode && c.name !== this.newRoomName && c.bed !== this.newRoomBed && c.slot !== this.newRoomSlot);

    if (otherRooms.findIndex(c =>c.code == this.newRoomCode.toString()) >-1){
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.ngOnInit();
      return;

    }
    if (otherRooms.some(c => c.code === this.newRoomCode && c.name === this.newRoomName && c.bed === this.newRoomBed && c.slot === this.newRoomSlot)) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.newRoomCode = "";
      this.newRoomName = "";
      this.newRoomSlot = 0;
      this.newRoomBed = "";
      return;
    }
    
    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newRoomName }));
    this.data.dialogRef?.close();
    this.data.element.code = this.newRoomCode;
    this.data.element.name = this.newRoomName;
    this.data.element.slot = this.newRoomSlot;
    this.data.element.bed = this.newRoomBed;
    this.data.element.roomTypeId = this.newRoomTypeId;
    this.data.element.hotelId = this.newHotelId;
    this.data.table?.renderRows();
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();

  }

  delete() {
    const dialog = this.dialog.open(RoomDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.roomService.deleteRoom({ code: this.newRoomCode, bed: this.newRoomBed, slot: this.newRoomSlot,roomTypeId: this.newRoomTypeId }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}

