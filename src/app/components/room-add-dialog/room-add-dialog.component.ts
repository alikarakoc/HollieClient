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
  roomtypeId: FormType<number>;
  hotelId: FormType<number>;
  clean: FormType<Boolean>
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
  roomReservation:boolean=false;
  //clean: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomAddDialogComponent>,
    private roomService: RoomService,
    public translocoService: TranslocoService,
    private roomTypeService: RoomTypeService,
    private hotelService: HotelService
  ) { }


  allRoomTypes: RoomType[] = [];
  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      if (res.data !== null) this.allRoomTypes = res.data
      else this.allRoomTypes = []
    })

    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data
      else this.hotels = []
    })
  }

  onChange(event :any){
    this.roomTypes = [];
    for(let i = 0; i < this.allRoomTypes.length; i++){
      if(this.allRoomTypes[i].hotelId == this.hotelId){
        this.roomTypes.push(this.allRoomTypes[i]);
      }
    }
  }

  add() {
    const predicate = (a: Omit<Room, 'id'>) =>
      a.code === this.roomCode &&
      a.name === this.roomName &&
      a.roomTypeId === this.roomTypeId &&
      a.hotelId === this.hotelId &&
      a.reservation === this.roomReservation;

    alert(this.roomReservation);
      //a.clean === this.clean;
      // a.reserved===this.roomReserved;
    const condition = this.roomService.rooms.some(predicate);

    this.roomService.getAllRooms().subscribe((res) => {
      if (res.data.some(c => c.code === this.roomCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { data: this.translocoService.getActiveLang() === 'en' ? 'room type' : 'oda tipi' }), "OK");
        this.roomCode = "";
        return;
      }

    });



    if (!this.roomCode || !this.roomName || !this.hotelId|| !this.roomTypeId) {
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
    this.dialogRef.close({
      isAdded: true,
      element: {
        code: this.roomCode,
        name: this.roomName,
        hotelId: this.hotelId,
        roomtypeId: this.roomTypeId,
        reservation:this.roomReservation,
      }
    });
  }



  getItem(type:  "room_type" , element: Room) {
    switch (type) {
      case 'room_type':
        const idRoomType = this.allRoomTypes.filter(cR => cR.hotelId === element.hotelId).map(cR => cR.hotelId);

        //return idRoomType.map(i => this.roomTypes.find(r => r.id === i).name);
    }}
}
