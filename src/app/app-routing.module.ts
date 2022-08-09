import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent, CountryComponent, ErrorComponent, HotelCategoryComponent, RoomTypeComponent,HotelComponent, MarketComponent, BoardComponent, CurrencyComponent, ContractComponent, SearchContractComponent, IndexComponent } from "./pages";
import { HomeComponent } from "./pages/home/home.component";
import { RoomComponent } from './pages/room/room.component';

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
    path: "index",
    component: IndexComponent
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
    path: "search-contract",
    component: SearchContractComponent
  },
  {
    path: "room",
    component: RoomComponent
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
