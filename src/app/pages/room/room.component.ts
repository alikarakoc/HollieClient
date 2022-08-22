import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  columns: string[] = ["code", "name", "HotelId", "roomTypeId", "reserved", "actions" ];
  //columns: string[] = ["code", "name", "HotelId", "roomTypeId", "clean", "actions"  ];
  dataSource: MatTableDataSource<Room>;
  value = '';
  reserve:boolean;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Room>;
  @ViewChild(MatSort) sort: MatSort;

  Room = 'ExcelSheet.xlsx';

  rooms: Room[] = [];
  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];
  available: any[]=[];


  constructor(
    private cdr: ChangeDetectorRef,
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
        hotel: this.getCurrentHotel(r),
        roomtype: this.getCurrentRoomType(r),
        clean: r.clean
      }
    })
    this.excelService.exportAsExcelFile(arrayToExport, 'Room');
  }
  // checkCheckBoxvalue(event:any){
  //   console.log(event.target.checked)
  // }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((res) => {
      if(res.data!=null){
         this.rooms = res.data;
      }
      this.dataSource = new MatTableDataSource<Room>(this.rooms);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });

    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data;

    });

    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;

    });
  }

  filterRooms(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }

  onChange(event:any){

    if(event.checked){

      this.available = this.rooms.filter(f => f.reservation == true);
      this.dataSource.data = this.available;
    }
    else{
      this.dataSource = new MatTableDataSource<Room>(this.rooms);
    }
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
  }

  getCurrentRoomType(element: Room) {
    return this.roomTypes.find(c => c.id === element.roomTypeId)?.name;
  }


  getCurrentHotel(element: Room) {
    return this.hotels.find(c => c.id === element.hotelId)?.name;
  }

  get(element: Room) {
    if(element.reservation){
      return "Not Available"
    }
    else{
      return "Available"
    }


  }

  create() {
    const dialog = this.dialog.open(RoomAddDialogComponent, { data: { 
      table: this.table } });
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
    const dialog = this.dialog.open(RoomUpdateDialogComponent, { data: { element,  allRoomTypes: this.roomTypes, hotels: this.hotels, rooms: this.rooms  } });
    dialog.afterClosed().subscribe(result => {
      if (result.isUpdated) {
        this.roomService.updateRoom(element).subscribe(() => this.ngOnInit());
      }
    });

    console.log(element);

  }

  delete(element: Room) {
    const dialog = this.dialog.open(RoomDeleteDialogComponent, {
      data: { element },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.roomService.deleteRoom(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }



}
