import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AllFormsModule, MaterialModule, CdkModule } from './modules';
import { HttpClientModule } from '@angular/common/http';

import {
  HotelAddDialogComponent,
  HotelDeleteDialogComponent,
  HotelUpdateDialogComponent,
  AgencyAddDialogComponent,
  AgencyDeleteDialogComponent,
  AgencyUpdateDialogComponent,
  CountryAddDialogComponent,
  CountryDeleteDialogComponent,
  CountryUpdateDialogComponent,
  HotelCategoryAddDialogComponent,
  HotelCategoryDeleteDialogComponent,
  HotelCategoryUpdateDialogComponent,
  NavbarComponent,
  RoomTypeAddDialogComponent,
  RoomTypeDeleteDialogComponent,
  RoomTypeUpdateDialogComponent,
  MarketAddDialogComponent,
  MarketDeleteDialogComponent,
  MarketUpdateDialogComponent,
} from './components';

// Modules
import { AgencyComponent, CountryComponent, ErrorComponent, HotelCategoryComponent, HotelComponent, RoomTypeComponent,MarketComponent } from './pages';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HomeComponent } from './pages/home/home.component';
import { TranslocoRootModule } from './transloco-root.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,

    RoomTypeComponent,
    RoomTypeUpdateDialogComponent,
    RoomTypeAddDialogComponent,
    RoomTypeDeleteDialogComponent,

    CountryComponent,
    CountryAddDialogComponent,
    CountryUpdateDialogComponent,
    CountryDeleteDialogComponent,

    AgencyComponent,
    AgencyAddDialogComponent,
    AgencyDeleteDialogComponent,
    AgencyUpdateDialogComponent,

    HotelComponent,
    HotelAddDialogComponent,
    HotelDeleteDialogComponent,
    HotelUpdateDialogComponent,

    HotelCategoryComponent,
    HotelCategoryAddDialogComponent,
    HotelCategoryDeleteDialogComponent,
    HotelCategoryUpdateDialogComponent,

    MarketComponent,
    MarketAddDialogComponent,
    MarketUpdateDialogComponent,
    MarketDeleteDialogComponent,



    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllFormsModule,
    MaterialModule,
    CdkModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
