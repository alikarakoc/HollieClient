import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AllFormsModule, MaterialModule, CdkModule } from './modules';

import {
  AgencyAddDialogComponent,
  AgencyDeleteDialogComponent,
  AgencyUpdateDialogComponent,
  CountryAddDialogComponent,
  CountryDeleteDialogComponent,
  CountryUpdateDialogComponent,
  NavbarComponent,
  RoomTypeAddDialogComponent,
  RoomTypeDeleteDialogComponent,
  RoomTypeUpdateDialogComponent,
} from './components';

// Modules
import { AgencyComponent, CountryComponent, ErrorComponent, RoomTypeComponent } from './pages';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HomeComponent } from './pages/home/home.component';

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

    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllFormsModule,
    MaterialModule,
    CdkModule,
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
export class AppModule {}
