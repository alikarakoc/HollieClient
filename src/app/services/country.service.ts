import { Injectable } from '@angular/core';
import { Country } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = [];

  addNewCountry(country: Country) {
  }

  deleteCountry(country: Country) {
  }

  updateCountry(country: Country) {
  }

  constructor() { }
}
