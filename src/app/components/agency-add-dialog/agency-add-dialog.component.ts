import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency,Market } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { MarketService } from 'src/app/services/market.service';
import { AMarketService } from 'src/app/services/amarket.service';
import { TranslocoService } from '@ngneat/transloco';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AMarket } from 'src/app/interfaces/amarket';

interface DialogData {
  table: MatTable<Agency>;
}


@Component({
  selector: 'app-agency-add-dialog',
  templateUrl: './agency-add-dialog.component.html',
  styleUrls: ['./agency-add-dialog.component.scss'],
})
export class AgencyAddDialogComponent implements OnInit {

  agencyName: string;
  agencyCode: string;
  agencyPhone: string;
  agencyEmail: string;
  agencyAddress: string;
  MarketId: string;
  selectedMarkets: AMarket[];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgencyAddDialogComponent>,
    private agencyService: AgencyService,
    public translocoService: TranslocoService,
    private marketService: MarketService,
    private aMarketService: AMarketService,
  ) { }

  markets: any[] = [];
  aMarkets : any[] =[];

  emailControl = new FormControl('', [Validators.required,Validators.email]);

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe(res => {
      if(res.data !== null) this.markets = res.data
      else this.markets = []
    })
    this.aMarketService.getAllAMarkets().subscribe(res => {
      if (res.data !== null) this.aMarkets = res.data;
      else this.aMarkets = [];

    });
   }

  add() {
    if (!this.agencyCode || !this.agencyAddress || !this.emailControl.value || !this.agencyName || !this.agencyPhone || !this.selectedMarkets) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    if (this.agencyPhone.length != 11){
      this.snackBar.open(this.translocoService.translate('dialogs.error_phone'), "OK");
      return;
    }
    if (this.emailControl.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'));
      return;
    }

    this.agencyService.getAllAgencies().subscribe((res) => {
      // categories = res.data;
      if (res.data !== null && res.data.some(c => c.code === this.agencyCode || c.name === this.agencyName)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: 'agency' }), "OK");
        this.agencyCode = "";
        this.agencyName = "";
        this.agencyPhone = "";
        this.agencyAddress = "";
        this.agencyEmail = "";
        this.MarketId = "";

        return;

      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.agencyName }));

    // O an...
    // this.hotelCategoryService.addCategory({ name: this.categoryName });

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.agencyName,
      elementCode: this.agencyCode,
      elementAddress: this.agencyAddress,
      elementEmail: this.emailControl.value,
      elementPhone: this.agencyPhone,
      elementMarket: this.selectedMarkets,
      createdUser : localStorage.getItem("username")

    });
  }
}
