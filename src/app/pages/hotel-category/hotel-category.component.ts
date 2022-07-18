import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { HotelCategoryAddDialogComponent, HotelCategoryDeleteDialogComponent, HotelCategoryUpdateDialogComponent } from "src/app/components";
import { HotelCategory } from "src/app/interfaces";
import { HotelCategoryService } from "src/app/services";

@Component({
  selector: 'app-hotel-category',
  templateUrl: './hotel-category.component.html',
  styleUrls: ['./hotel-category.component.scss']
})
export class HotelCategoryComponent implements OnInit {
  columns: string[] = ["name", "actions"];
  @ViewChild(MatTable) table: MatTable<HotelCategoryComponent>;

  hotels: HotelCategory[] = [];

  constructor(
    public hotelCategoryService: HotelCategoryService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.hotelCategoryService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });
    console.log("on init");
  }

  create() {
    const dialog = this.dialog.open(HotelCategoryAddDialogComponent, { data: { table: this.table } });

    dialog.afterClosed().subscribe(() => {
      this.hotelCategoryService.getAllHotels().subscribe(res => {
        this.hotels = res.data;
      });
    });

 
  }

  update(element: HotelCategory) {
    this.dialog.open(HotelCategoryUpdateDialogComponent, { data: { element } });
    this.ngOnInit();
  }

  delete(element: HotelCategory) {
    const dialog = this.dialog.open(HotelCategoryDeleteDialogComponent, { data: { element } });
    this.hotelCategoryService.deleteCategory(element).subscribe((res) => {
      console.log(element);
      this.ngOnInit();
    });
  }
}
