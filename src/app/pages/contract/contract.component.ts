import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = [
    'code',
    'name',
    'price',
    'currency',
    'hotel',
    'market',
    'agency',
    'board',
    'roomType',
    'start',
    'end',
    'actions',
  ];

  @ViewChild(MatTable) table: MatTable<Contract>;

  contracts: Contract[] = [
    /* EXAMPLE */
    {
      name: 'Contract',
      code: 'C',
      agencyId: 1,
      boardId: 1,
      categoryId: 1,
      currencyId: 1,
      hotelId: 1,
      marketId: 1,
      roomTypeId: 1,
      price: 300,
      // TODO: Javascript Date nesnesinde aylar 0'ıncı index'ten başlıyor. O yüzden ayı çekerken 1 eksiltmek lazım
      start: new Date(2022, 1 - 1, 20),
      end: new Date(2022, 1 - 1, 26),
    },
  ];

  constructor(
    public translocoService: TranslocoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  create() {
    const dialog = this.dialog.open(ContractAddDialogComponent, { data: { table: this.table } });
  }

  delete(element: Contract) {}

  update(element: Contract) {}
}
