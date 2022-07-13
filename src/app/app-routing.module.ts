import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent, CountryComponent, ErrorComponent, RoomTypeComponent } from "./pages";
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
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
