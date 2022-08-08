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

interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}


@Component({
  selector: 'app-agency-update-dialog',
  templateUrl: './agency-update-dialog.component.html',
  styleUrls: ['./agency-update-dialog.component.scss'],
})
export class AgencyUpdateDialogComponent implements OnInit {

  newAgencyCode: string = this.data.element.code;
  newAgencyName: string = this.data.element.name;
  newAgencyEmail: string = this.data.element.email;
  newAgencyAddress: string = this.data.element.address;
  newAgencyPhone: string = this.data.element.phone;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AgencyUpdateDialogComponent>,
    private agencyService: AgencyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService
  ) { }

  emailControl = new FormControl('', [Validators.required,Validators.email]);

  agencies: any[] = [];

  ngOnInit(): void {
  }
  
  update() {
    
    if (!this.newAgencyName || !this.newAgencyAddress || !this.newAgencyCode || !this.emailControl.value || !this.newAgencyPhone) {
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
        console.log(this.newAgencyCode, this.newAgencyName);
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

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newAgencyName }));
    this.data.dialogRef?.close();

    console.log(this.newAgencyCode, this.newAgencyName);

    this.data.element.code = this.newAgencyCode;
    this.data.element.name = this.newAgencyName;
    this.data.element.email = this.emailControl.value!;
    this.data.element.address = this.newAgencyAddress;
    this.data.element.phone = this.newAgencyPhone;

    console.log(this.data.element);
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
