import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import {
  CountryAddDialogComponent,
  CountryDeleteDialogComponent,
  CountryUpdateDialogComponent
} from "src/app/components";
import { Country } from "src/app/interfaces";
import { CountryService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {
  columns: string[] = ["code", "name", "actions"];
  dataSource: MatTableDataSource<Country>;
  value = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Country>;
  @ViewChild(MatSort) sort: MatSort;
  checkButtonCount:number = 0;

  Country = 'Country';

  countries: Country[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public countryService: CountryService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.countries, this.Country);
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((res) => {
      if(res.data!=null){
        this.countries = res.data;
      }
      this.dataSource = new MatTableDataSource<Country>(this.countries);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
    });
  }


  filterCountries(event: Event) {
    var filterValue : string = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim();
  }

  clear(){
    this.ngOnInit();
  }


  ngAfterViewInit(): void {
  }

  update(element: Country) {
    const dialog = this.dialog.open(CountryUpdateDialogComponent, {
      data: { element, table: this.table },
    });

    //element.updatedUser =  localStorage.getItem("username");
    dialog.afterClosed().subscribe(result => {
      if (result.isUpdated) {
        this.countryService.updateCountry(element).subscribe(() => this.ngOnInit());
      }
    });
  }

  create() {
    if(this.checkButtonCount < 1){
      const dialog = this.dialog.open(CountryAddDialogComponent, {
        data: { table: this.table,  deneme: this.checkButtonCount  },
      });

      dialog.afterClosed().subscribe((result) => {
        if (result.isAdded) {
          this.countryService
            .addCountry(result.element)
            .subscribe(() => {
              this.ngOnInit();
            });
        }
        this.checkButtonCount = 0;
      });
    }
    this.checkButtonCount += 1;

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

