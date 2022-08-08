import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { RoomAddDialogComponent} from "src/app/components/room-add-dialog/room-add-dialog.component";
import { RoomType , Hotel } from "src/app/interfaces";
import { Room } from "src/app/interfaces/room";
import { RoomTypeService,HotelService} from "src/app/services";
import { RoomService } from "src/app/services/room.service";
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { RoomDeleteDialogComponent, RoomUpdateDialogComponent } from 'src/app/components';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  columns: string[] = ["code", "name", "bed","slot" , "roomTypeId","HotelId", "actions" ];
  dataSource: MatTableDataSource<Room>;
  value = '';

  @ViewChild(MatTable) table: MatTable<Room>;
  @ViewChild(MatSort) sort: MatSort;

  Room = 'ExcelSheet.xlsx';

  rooms: Room[] = [];
  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];


  constructor(
    public roomService: RoomService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private roomTypeService: RoomTypeService,
    private hotelService: HotelService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    const arrayToExport = this.rooms.map(r => {
      return {
        code: r.code,
        name: r.name,
        slot: r.slot,
        roomtype: this.getCurrentRoomType(r),
        bed: r.bed
      }
    })
    this.excelService.exportAsExcelFile(arrayToExport, 'Room');
  }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((res) => {
      if(res.data!=null){
         this.rooms = res.data;
      }
     
      this.dataSource = new MatTableDataSource<Room>(this.rooms);
      this.dataSource.sort = this.sort;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;
      
    });

    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
      
    });
  }

  filterRooms(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  clear(){
    this.ngOnInit();
  }


  getCurrentRoomType(element: Room) {
    return this.roomTypes.find(c => c.id === element.roomTypeId)?.name;
  }

  getCurrentHotel(element: Hotel) {
    return this.hotels.find(c => c.id === element.id)?.name;
  }

  create() {
    console.log(this.rooms);

    const dialog = this.dialog.open(RoomAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.roomService
          .addRoom(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });

  }

  update(element: Room) {
    const dialog = this.dialog.open(RoomUpdateDialogComponent, { data: { element } });

    dialog.afterClosed().subscribe(result => {
      if (result.isUpdated) {
        this.roomService.updateRoom(element).subscribe(() => this.ngOnInit());
      }
    });
  }

  delete(element: Room) {
    const dialog = this.dialog.open(RoomDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.roomService.deleteRoom(element).subscribe((res) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }



}
