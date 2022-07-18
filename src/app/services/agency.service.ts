import { Injectable } from '@angular/core';
import { Agency } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  agencies: Agency[] = [
    {
      name: "Summer Tour",
      code: "1",
      address: "Fener Mh. Muratpaşa/Antalya",
      email: "info@summertour.com",
      phone: "(123) 321 1234"
    },
    {
      name: "Agency 2",
      code: "2",
      address: "Address:)",
      email: "agency2.com",
      phone: "(123) 321 1234"
    },
    {
      name: "Agency 2",
      code: "2",
      address: "Address:)",
      email: "agency2.com",
      phone: "(123) 321 1234"
    },
  ];

  // Buyrun efenim
  addNewAgency() { }

  deleteAgency() { }

  constructor() { }
}
