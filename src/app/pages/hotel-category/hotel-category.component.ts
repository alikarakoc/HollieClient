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

  hotels: HotelCategory[] =[];
  hotel : HotelCategory ={
    id:'',
    name: ''
  }

  constructor(
    public hotelCategoryService: HotelCategoryService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.hotelCategoryService.getAllHotels());
    console.log(this.getHotels());
  }

  create() {
    this.dialog.open(HotelCategoryAddDialogComponent, { data: { table: this.table } });
  }

  update(element: HotelCategory) {
    this.dialog.open(HotelCategoryUpdateDialogComponent, { data: { element } });
  }

  delete(element: HotelCategory) {
    this.dialog.open(HotelCategoryDeleteDialogComponent, { data: { element } });
  }

  // getAllHotels(){
  //   console.log("service call inside getAll");
  //   this.hotelCategoryService.getAllHotels()
  //   .subscribe(
  //     response => {
  //       this.hotels = response;
  //       console.log(this.hotels);
  //     }
  //   );
  //   console.log("get all hotels worked")

  // }

  getHotels(){
    this.hotelCategoryService.getAllHotels().subscribe((res) => {
      this.hotels = res.data;
    },)
    console.log(this.hotels);
  }



}
