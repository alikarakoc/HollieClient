import { Component, OnInit } from '@angular/core';
import { TranslocoService } from "@ngneat/transloco";
import { Currency } from "src/app/interfaces";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  columns: string[] = ["code", "name", "actions"];
  currencies: Currency[] = [
    /* EXAMPLE */
    {
      code: "TUR",
      name: "Turkish Lira"
    },
    {
      code: "USD",
      name: "American Dollasr"
    }
  ];

  constructor(
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  create() { }

  delete(element: Currency) { }

  update(element: Currency) { }

}
