import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { RoomType, Hotel } from 'src/app/interfaces';
import { Room} from 'src/app/interfaces/room';
import { RoomService } from 'src/app/services/room.service';
import { TranslocoService } from '@ngneat/transloco';
import { RoomTypeService , HotelService } from 'src/app/services';

interface DialogData {
  table: MatTable<Room>;
}

type FormType<C> = FormControl<C | null>;

interface FormData {
  code: FormType<string>;
  name: FormType<string>;
  roomtypeid: FormType<number>;
  hotelId: FormType<number>;
  slot: FormType<number>;
  bed: FormType<string>;
}

@Component({
  selector: 'app-room-add-dialog',
  templateUrl: './room-add-dialog.component.html',
  styleUrls: ['./room-add-dialog.component.scss']
})
export class RoomAddDialogComponent implements OnInit {
  roomCode: string;
  roomName: string;
  roomTypeId: number;
  hotelId: number;
  roomSlot: number;
  roomBed: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomAddDialogComponent>,
    private roomService: RoomService,
    public translocoService: TranslocoService,
    private roomTypeService: RoomTypeService,
    private hotelService: HotelService
  ) { }

  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      if (res.data !== null) this.roomTypes = res.data
      else this.roomTypes = []
    })

    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data
      else this.hotels = []
    })
  }

  add() {

    const predicate = (a: Omit<Room, 'id'>) =>
      a.code === this.roomCode &&
      a.name === this.roomName &&
      a.roomTypeId === this.roomTypeId &&
      a.HotelId === this.hotelId &&
      a.slot === this.roomSlot &&
      a.bed === this.roomBed;

    const condition = this.roomService.rooms.some(predicate);

    this.roomService.getAllRooms().subscribe((res) => {
      // categories = res.data;
      if (res.data.some(c => c.code === this.roomCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'hotel category' : 'otel türü' }), "OK");
        this.roomCode = "";
        return;
      }
    });

    if (!this.roomCode || !this.roomName || !this.roomSlot|| !this.roomBed) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
      return;
    }

    if (condition) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Hotel' : 'Otel' }), 'OK');
      return;
    }


    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.roomName }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    console.log(this.roomTypeId);

    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.roomCode,
        name: this.roomName,
        roomtypeid: this.roomTypeId,
        hotelid: this.hotelId,
        slot: this.roomSlot,
        bed: this.roomBed
      }
    });

  }
}
