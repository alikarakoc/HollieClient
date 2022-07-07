import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { CountryAddDialogComponent, CountryUpdateDialogComponent } from "src/app/components";
import { Country } from "src/app/interfaces";
import { CountryService } from "src/app/services";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  columns: string[] = ["name", "actions"]
  @ViewChild(MatTable) table: MatTable<Country>;

  constructor(public countryService: CountryService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  update(element: Country) {
    this.dialog.open(CountryUpdateDialogComponent, { data: { element } });
  }

  createNewCountry() {
    this.dialog.open(CountryAddDialogComponent, { data: { table: this.table } });
  }
}
