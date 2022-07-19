import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { HotelAddDialogComponent, HotelDeleteDialogComponent, HotelUpdateDialogComponent } from "src/app/components";
import { Hotel } from "src/app/interfaces";
import { HotelService } from "src/app/services/hotel.service";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  columns: string[] = ["name", "address", "phone", "email", "actions"];
  @ViewChild(MatTable) table: MatTable<Hotel>;

  constructor(public hotelService: HotelService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  create() {
    this.dialog.open(HotelAddDialogComponent, { data: { table: this.table } });
  }

  update(element: Hotel) {
    this.dialog.open(HotelUpdateDialogComponent, { data: { element } });
  }

  delete(element: Hotel) {
    this.dialog.open(HotelDeleteDialogComponent, { data: { element } });
  }

}
