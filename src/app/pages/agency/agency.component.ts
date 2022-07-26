import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import {
  AgencyAddDialogComponent,
  AgencyDeleteDialogComponent,
  AgencyUpdateDialogComponent,
} from 'src/app/components';
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
})
export class AgencyComponent implements OnInit {
  columns: string[] = ['code','name', 'address', 'phone', 'email', 'actions'];
  @ViewChild(MatTable) table: MatTable<Agency>;

  fileName= 'ExcelSheet.xlsx';

  agencies: Agency[] = [];
  //tuana
  constructor(
    public agencyService: AgencyService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  exportExcel() {
    if (this.agencies.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.agencies);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  ngOnInit(): void {
    this.agencyService.getAllAgencies().subscribe((res) => {
      this.agencies = res.data;
    });
    console.log('on init');

  }

  create() {
    const dialog = this.dialog.open(AgencyAddDialogComponent, {
      data: { table: this.table }
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.agencyService
          .addAgency({ name: result.elementName ,code: result.elementCode ,address: result.elementAddress ,email: result.elementEmail ,phone: result.elementPhone })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  update(element: Agency) {
    const dialog = this.dialog.open(AgencyUpdateDialogComponent, {
      data: { element }
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isUpdated) {
        this.agencyService.updateAgency(element).subscribe((res) => {
          this.ngOnInit();
        });
      }
    })
  }

  delete(element: Agency) {
    const dialog = this.dialog.open(AgencyDeleteDialogComponent, {
      data: { element }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.agencyService.deleteAgency(element).subscribe((res) => {
          console.log(element);
          this.ngOnInit();

        });
      }
    })
  }
}
