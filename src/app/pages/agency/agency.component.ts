import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
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

  agencies: Agency[] = [];
  //tuana
  constructor(
    public agencyService: AgencyService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

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
