import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import {
  CountryAddDialogComponent,
  CountryDeleteDialogComponent,
  CountryUpdateDialogComponent
  } from "src/app/components";
import { Country } from "src/app/interfaces";
import { CountryService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  columns: string[] = ["name", "actions"];
  @ViewChild(MatTable) table: MatTable<Country>;
  countries : Country [] =[];

  constructor(public countryService: CountryService, private dialog: MatDialog, public translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((res) => {
      this.countries = res.data;
    });
  }

  update(element: Country) {
    const dialog = this.dialog.open(CountryUpdateDialogComponent, {
      data: { element, table: this.table },
    });

    dialog.afterClosed().subscribe(() => {
      this.countryService.updateCountry(element); /* .subscribe(); */
    });
  }




  create() {

    const dialog = this.dialog.open(CountryAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.countryService
          .addCountry({ name: result.elementName })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  delete(element: Country) {
    const dialog = this.dialog.open(CountryDeleteDialogComponent, {
      data: { element, table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.countryService
          .deleteCountry(element)
          .subscribe(() => this.ngOnInit());
      }
    });
  }
}
