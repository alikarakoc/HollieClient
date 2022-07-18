import { Injectable } from '@angular/core';
import { Country } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = [
    {
      name: "Turkey",
      code: "1"
    },
    {
      name: "America",
      code: "2"
    },
    {
      name: "Holland",
      code: "3"
    },
    {
      name: "Greece",
      code: "4"
    },
    {
      name: "France",
      code: "5"
    },
  ];

  addNewCountry(country: Country) {
  }

  deleteCountry(country: Country) {
  }

  updateCountry(country: Country) {
  }

  constructor() { }
}
