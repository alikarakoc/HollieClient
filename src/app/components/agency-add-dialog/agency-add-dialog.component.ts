import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { TranslocoService } from '@ngneat/transloco';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgencyAddDialogComponent>,
    private agencyService: AgencyService,
    public translocoService: TranslocoService
  ) { }

  emailControl = new FormControl('', [Validators.required,Validators.email]);

  ngOnInit(): void { }

  add() {
    if (!this.agencyCode || !this.agencyAddress || !this.emailControl.value || !this.agencyName || !this.agencyPhone ) {
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
      elementPhone: this.agencyPhone
    });
  }
}
