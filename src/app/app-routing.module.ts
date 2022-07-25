import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent, CountryComponent, ErrorComponent, HotelCategoryComponent, RoomTypeComponent,HotelComponent, MarketComponent, BoardComponent, CurrencyComponent, ContractComponent } from "./pages";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    redirectTo: ""
  },
  {
    path: "room-types",
    component: RoomTypeComponent
  },
  {
    path: "countries",
    component: CountryComponent
  },
  {
    path: "agencies",
    component: AgencyComponent
  },
  {
    path: "hotels",
    component: HotelComponent
  },
  
  {
    path: "board",
    component: BoardComponent
  },
  {
    path: "hotel-categories",
    component: HotelCategoryComponent
  },
  {
    path: "market",
    component: MarketComponent
  },
  {
    path: "currencies",
    component: CurrencyComponent
  },
  {
    path: "contracts",
    component: ContractComponent
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
