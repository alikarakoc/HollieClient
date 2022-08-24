import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { AgencyDeleteDialogComponent } from '../agency-delete-dialog/agency-delete-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { AMarket } from 'src/app/interfaces/amarket';

interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
  markets: any[];
  aMarkets: any[];
}


@Component({
  selector: 'app-agency-update-dialog',
  templateUrl: './agency-update-dialog.component.html',
  styleUrls: ['./agency-update-dialog.component.scss'],
})
export class AgencyUpdateDialogComponent implements OnInit {

  agency = this.data.element;
  id = this.data.element.id;
  newAgencyCode: string = this.data.element.code;
  newAgencyName: string = this.data.element.name;
  newAgencyEmail: string = this.data.element.email;
  newAgencyAddress: string = this.data.element.address;
  newAgencyPhone: string = this.data.element.phone;
  newselectedMarkets: any[] = this.data.element.marketList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AgencyUpdateDialogComponent>,
    private agencyService: AgencyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService
  ) {
    this.markets = this.data.markets;
    // this.aMarkets = this.data.aMarkets;
   }
   aMarkets : any[] = [];
   markets: any[] = [];
   selectedValue: any[] = [];

  emailControl = new FormControl('', [Validators.required,Validators.email]);

  agencies: any[] = [];

  ngOnInit(): void {
    const idMarket = this.data.aMarkets.filter(aM => aM.listId === this.data.element.id).map(aM => aM.marketId);
    this.newselectedMarkets = idMarket;

  }

  update() {

    if (!this.newAgencyName || !this.newAgencyAddress || !this.newAgencyCode || !this.emailControl.value || !this.newAgencyPhone || !this.newselectedMarkets) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }
    if (this.newAgencyPhone.length != 11){
      this.snackBar.open(this.translocoService.translate('dialogs.error_phone'), "OK");
      return;
    }
    if (this.emailControl.hasError('email')) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_email'));
      return;
    }

    this.agencyService.getAllAgencies().subscribe(res => {
      const otherAgencies = res.data.filter(c => c.id !== this.data.element.id && c.name !== this.newAgencyName);
      if (res.data !== null && otherAgencies.some(c => c.code === this.newAgencyCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'agency' : 'acenta' }), "OK");
        this.newAgencyCode = "";
        this.newAgencyName = "";

        return;
      }
      if (this.emailControl.hasError('required')) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_required'));
        return;
      }




    });

    for(let i = 0; i < this.newselectedMarkets.length; i++){
      const market : AMarket = {
        marketId: 0
      };
      market.marketId = this.newselectedMarkets[i];
      this.newselectedMarkets[i] = market;
     };


    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newAgencyName }));
    this.data.dialogRef?.close();

    this.data.element.code = this.newAgencyCode;
    this.data.element.name = this.newAgencyName;
    this.data.element.email = this.emailControl.value!;
    this.data.element.address = this.newAgencyAddress;
    this.data.element.phone = this.newAgencyPhone;
    this.data.element.marketList = this.newselectedMarkets;
    this.data.element.updatedUser = localStorage.getItem("username") + "";
    this.data.table?.renderRows();
   this.agencyService.updateAgency(this.data.element)
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();

  }

  delete() {
    const dialog = this.dialog.open(AgencyDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.agencyService.deleteAgency({ code: this.newAgencyCode, name: this.newAgencyName ,phone: this.newAgencyPhone ,address: this.newAgencyAddress ,email: this.newAgencyEmail}).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

}
