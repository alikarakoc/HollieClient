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
  columns: string[] = ['name', 'address', 'phone', 'email', 'actions'];
  @ViewChild(MatTable) table: MatTable<Agency>;

  constructor(
    public agencyService: AgencyService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void { }

  create() {
    this.dialog.open(AgencyAddDialogComponent, { data: { table: this.table } });
  }

  update(element: Agency) {
    this.dialog.open(AgencyUpdateDialogComponent, { data: { element } });
  }

  delete(element: Agency) {
    this.dialog.open(AgencyDeleteDialogComponent, { data: { element } });
  }
}
