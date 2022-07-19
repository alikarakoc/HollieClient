import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Agency } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  agencies: Agency[] = [];

  baseUrl = `${environment.baseUrl}/`

  // Buyrun efenim
  addNewAgency() { }

  deleteAgency() { }

  constructor() { }
}
