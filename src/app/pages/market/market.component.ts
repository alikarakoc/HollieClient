import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {
  MarketAddDialogComponent,
  MarketDeleteDialogComponent,
  MarketUpdateDialogComponent,
} from 'src/app/components';
import { Market } from 'src/app/interfaces';
import { MarketService } from 'src/app/services';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  columns: string[] = ['code','name', 'actions'];
  @ViewChild(MatTable) table: MatTable<MarketComponent>;

  markets: Market[] = [];
  // hotel: HotelCategory = {
  //   id: '',
  //   name: ''
  // };

  constructor(
    public marketService: MarketService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe((res) => {
      this.markets = res.data;
    });
    console.log('on init');
  }

  create() {
    const dialog = this.dialog.open(MarketAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.marketService
          .addMarket({
            name: result.elementName, code: result.elementCode })
          .subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  update(element: Market) {
    const dialog = this.dialog.open(MarketUpdateDialogComponent, {
      data: { element },
    });

    dialog.afterClosed().subscribe(() => {
      this.marketService.updateMarket(element).subscribe((res) => {
        // this.hotel.name = element.name;
        // this.hotel.id = element.id;
        console.log('res data checkec');
        console.log(res.data);
      });
    });
  }

  delete(element: Market) {
    const dialog = this.dialog.open(MarketDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.marketService.deleteMarket(element).subscribe((res: any) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }
}

