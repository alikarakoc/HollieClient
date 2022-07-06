import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AllFormsModule, MaterialModule, CdkModule } from "./modules";

import { NavbarComponent } from "./components";
import { RoomTypeComponent } from "./pages";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoomTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllFormsModule,
    MaterialModule,
    CdkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
