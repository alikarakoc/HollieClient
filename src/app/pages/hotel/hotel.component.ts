import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { HotelAddDialogComponent, HotelDeleteDialogComponent, HotelUpdateDialogComponent } from "src/app/components";
import { Hotel, HotelCategory } from "src/app/interfaces";
import { HotelCategoryService, HotelService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  columns: string[] = ["name", "address", "phone", "email", "actions", "HotelCategoryId"];
  @ViewChild(MatTable) table: MatTable<Hotel>;

  hotels: Hotel[] = [];
  hotelCategories: HotelCategory[] = [];

  constructor(
    public hotelService: HotelService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelCategoryService: HotelCategoryService,
  ) { }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((res) => {
      this.hotels = res.data;
    });
    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotelCategories = res.data;
    })
    console.log('on init');
  }

  getCurrentCategory(element: Hotel) {
    return this.hotelCategories.find(c => c.id === element.hotelCategoryId)?.name;
  }

  create() {
    console.log(this.hotels);

    const dialog = this.dialog.open(HotelAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.hotelService
          .addHotel(result.element)
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });

  }

  update(element: Hotel) {
    this.dialog.open(HotelUpdateDialogComponent, { data: { element } });
  }

  delete(element: Hotel) {
    const dialog = this.dialog.open(HotelDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.hotelService.deleteHotel(element).subscribe((res) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }

}
