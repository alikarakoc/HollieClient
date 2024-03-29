import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginRegisterComponent } from 'src/app/pages/Login-Register/Login-Register.component';
import { AuthGuard } from './guards/common/auth.guard';
import { AgencyComponent, CountryComponent, ErrorComponent, HotelCategoryComponent, RoomTypeComponent,HotelComponent, MarketComponent, BoardComponent, CurrencyComponent, ContractComponent, SearchContractComponent, LoginComponent, SearchAccommodationComponent, AccommodationComponent } from "./pages";
import { ContractGranttComponent } from './pages/contract-grantt/contract-grantt.component';
import { HomeComponent } from "./pages/home/home.component";
import { HotelFeatureComponent } from './pages/hotel-feature/hotel-feature.component';
import { RoomComponent } from './pages/room/room.component';


export const routes: Routes = [
 
  {
    path: "",
    component: LoginRegisterComponent
  },
  {
    path: "home",
    component: HomeComponent, canActivate:[AuthGuard]
  },
  
  // {
  //   path: "home",
  //   redirectTo: "",canActivate:[AuthGuard]
  // },
  {
    path: "room-types",
    component: RoomTypeComponent, canActivate:[AuthGuard]
  },
  {
    path: "countries",
    component: CountryComponent, canActivate:[AuthGuard]
  },
  {
    path: "agencies",
    component: AgencyComponent, canActivate:[AuthGuard]
  },
  {
    path: "hotels",
    component: HotelComponent, canActivate:[AuthGuard]
  },
  {
    path: "board",
    component: BoardComponent, canActivate:[AuthGuard]
  },
  {
    path: "contract-grantt",
    component: ContractGranttComponent, canActivate:[AuthGuard]
  },
  {
    path: "hotel-categories",
    component: HotelCategoryComponent, canActivate:[AuthGuard]
  },
  {
    path: "market",
    component: MarketComponent, canActivate:[AuthGuard]
  },
  {
    path: "currencies",
    component: CurrencyComponent, canActivate:[AuthGuard]
  },
  {
    path: "contracts",
    component: ContractComponent, canActivate:[AuthGuard]
  },
  {
    path: "search-contract",
    component: SearchContractComponent, canActivate:[AuthGuard]
  },
  {
    path: "search-accommodation",
    component: SearchAccommodationComponent, canActivate:[AuthGuard]
  },
  {
    path: "accommodation",
    component: AccommodationComponent, canActivate:[AuthGuard]
  },
  {
    path: "room",
    component: RoomComponent, canActivate:[AuthGuard]
  },
  {
    path: "hotel-features",
    component: HotelFeatureComponent, canActivate:[AuthGuard]
  },
  {
    path: "**",
    component: ErrorComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  providers:[AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
