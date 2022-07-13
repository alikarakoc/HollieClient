import { Component, OnInit } from '@angular/core';
import { CountryService, RoomTypeService } from "src/app/services";
import { AgencyService } from "src/app/services/agency.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public countryService: CountryService,
    public roomTypeService: RoomTypeService,
    public agencyService: AgencyService
  ) { }

  ngOnInit(): void {
  }

}
