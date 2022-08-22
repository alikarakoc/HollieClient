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
import { CheckboxRequiredValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs';

interface DialogData {
  element: Room;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
  allRoomTypes: any[];
  rooms: any[];
  hotels: any[];

}

@Component({
  selector: 'app-room-update-dialog',
  templateUrl: './room-update-dialog.component.html',
  styleUrls: ['./room-update-dialog.component.scss']
})
export class RoomUpdateDialogComponent implements OnInit {
  newRoomCode : string = this.data.element.code;
  newRoomName: string = this.data.element.name;
  newHotelId: number = this.data.element.hotelId;
  newRoomTypeId: number = this.data.element.roomTypeId;
  newReservation?: boolean = this.data.element.reservation;
  //cleanStatus: boolean = this.data.element.clean;

  sameCodeCheck = false;
  sameNameCheck = false;

  allRoomTypes: RoomType[] =[];
  roomTypes: RoomType[] = []
  rooms: Room[] = [];
  hotels: Hotel[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<RoomUpdateDialogComponent>,
    private roomService: RoomService,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private roomTypeService: RoomTypeService,
  ) {

    this.allRoomTypes = this.data.allRoomTypes;
    this.rooms = this.data.rooms;
    this.hotels = this.data.hotels;
   }

  


  ngOnInit(): void {
    const roomTypeFilterhotel = this.allRoomTypes.filter(r => r.hotelId === this.data.element.hotelId);
    this.roomTypes = roomTypeFilterhotel;
  }

  onChangeHotelUpdate(event :any){
    console.log(event);
    this.roomTypes = [];
    for(let i = 0; i < this.allRoomTypes.length; i++){
      if(this.allRoomTypes[i].hotelId == this.newHotelId){
        this.roomTypes.push(this.allRoomTypes[i]);
      }
    }
  }



  update() {
    if (!this.newRoomName || !this.newRoomCode || !this.newHotelId || !this.newRoomTypeId ) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    const otherRoomCode = this.rooms;
    const otherRooms = this.rooms.filter(c =>
      c.code !== this.newRoomCode &&
      c.name !== this.newRoomName &&
      c.hotelId !== this.newHotelId &&
      c.roomTypeId !== this.newRoomTypeId);
      //c.clean !== this.cleanStatus

    if (otherRooms.findIndex(c =>c.code == this.newRoomCode.toString()) >-1){
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.ngOnInit();
      return;
    }

    if (otherRooms.some(c =>
      c.code === this.newRoomCode &&
      c.name === this.newRoomName &&
      c.hotelId === this.newHotelId &&
      c.roomTypeId === this.newRoomTypeId
       )) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel' : 'otel' }), "OK");
      this.newRoomCode = "";
      this.newRoomName = "";
      this.newHotelId = 0;
      this.newRoomTypeId = 0;
      //this.cleanStatus = false;
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newRoomName }));
    this.data.dialogRef?.close();
    this.data.element.code = this.newRoomCode;
    this.data.element.name = this.newRoomName;
    this.data.element.hotelId = this.newHotelId;
    this.data.element.roomTypeId = this.newRoomTypeId;
    this.data.element.reservation = this.newReservation;
    //this.data.element.clean = this.cleanStatus;

    this.data.table?.renderRows();
    this.dialogRef.close({ isUpdated: true });

  }
  onChange(event:any){
    this.data.element.reservation=event.checked;
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
        this.roomService.deleteRoom({
          code: this.newRoomCode,
          name: this.newRoomName,
          hotelId: this.newHotelId,
          reservation: this.newReservation,
          //clean: this.cleanStatus,
          roomTypeId: this.newRoomTypeId }).subscribe(() => {
          this.ngOnInit();
        });
      }

    });


  }

}

