import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { map, Observable, shareReplay } from "rxjs";
import { RoomTypeAddDialogComponent, RoomTypeUpdateDialogComponent } from "src/app/components";
import { RoomType } from "src/app/interfaces";
import { RoomTypeService } from "src/app/services";

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {
  columns: string[] = ["name", "actions"];
  dataSource = [...this.roomTypeService.rooms];

  @ViewChild(MatTable) table: MatTable<RoomType>;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, public roomTypeService: RoomTypeService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
  }

  update(element: RoomType) {
    this.dialog.open(RoomTypeUpdateDialogComponent, { data: { element } });
  }

  createNewRoomType() {
    this.dialog.open(RoomTypeAddDialogComponent, { data: { table: this.table } });
    // this.table.renderRows();
  }

}
