import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomTypeComponent } from "./pages";

const routes: Routes = [
  {
    path: "room-types",
    component: RoomTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
