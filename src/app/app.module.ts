import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AllFormsModule, MaterialModule, CdkModule, TranslocoRootModule } from './modules';
import { HttpClientModule } from '@angular/common/http';

import {
  HotelAddDialogComponent,
  HotelDeleteDialogComponent,
  HotelUpdateDialogComponent,

  RoomAddDialogComponent,
  RoomDeleteDialogComponent,
  RoomUpdateDialogComponent,

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

  BoardAddDialogComponent,
  BoardDeleteDialogComponent,
  BoardUpdateDialogComponent,

  CurrencyAddDialogComponent,
  CurrencyDeleteDialogComponent,
  CurrencyUpdateDialogComponent,

  ContractAddDialogComponent,
  ContractDeleteDialogComponent,
  ContractUpdateDialogComponent,

  ContractDetailsComponent,

} from './components';

import { HotelFeatureAddDialogComponent } from 'src/app/components/hotel-feature-add-dialog/hotel-feature-add-dialog.component';
import { HotelFeatureUpdateDialogComponent } from 'src/app/components/hotel-feature-update-dialog/hotel-feature-update-dialog.component';
import { HotelFeatureDeleteDialogComponent } from 'src/app/components/hotel-feature-delete-dialog/hotel-feature-delete-dialog.component';


// Modules
import { AgencyComponent, CountryComponent, ErrorComponent, HotelCategoryComponent, 
  HotelComponent, RoomTypeComponent, MarketComponent, BoardComponent, CurrencyComponent, 
  ContractComponent, SearchContractComponent,  } from './pages';

import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { HotelFeatureComponent } from './pages/hotel-feature/hotel-feature.component';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { LocalizedDatePipe } from "./pipes";

import { AsyncPipe, registerLocaleData } from "@angular/common";
import localeTR from '@angular/common/locales/tr';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { ExcelService } from './services/excel.service';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeTR);

@NgModule({
  declarations: [
    LocalizedDatePipe,

    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchContractComponent,
    ContractDetailsComponent,

    RoomTypeComponent,
    RoomTypeUpdateDialogComponent,
    RoomTypeAddDialogComponent,
    RoomTypeDeleteDialogComponent,

    CountryComponent,
    CountryAddDialogComponent,
    CountryUpdateDialogComponent,
    CountryDeleteDialogComponent,

    RoomComponent,
    RoomAddDialogComponent,
    RoomUpdateDialogComponent,
    RoomDeleteDialogComponent,

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

    BoardComponent,
    BoardAddDialogComponent,
    BoardDeleteDialogComponent,
    BoardUpdateDialogComponent,

    CurrencyComponent,
    CurrencyAddDialogComponent,
    CurrencyDeleteDialogComponent,
    CurrencyUpdateDialogComponent,

    ContractComponent,
    ContractAddDialogComponent,
    ContractDeleteDialogComponent,
    ContractUpdateDialogComponent,

    HotelFeatureComponent,
    HotelFeatureAddDialogComponent,
    HotelFeatureUpdateDialogComponent,
    HotelFeatureDeleteDialogComponent,

    ErrorComponent,
      FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllFormsModule,
    MaterialModule,
    CdkModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    TranslocoRootModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true,
        // hasBackdrop: false,
        width: '26vw'
      }
    },
    ExcelService,
    AsyncPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {  }
