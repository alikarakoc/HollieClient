import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Agency } from 'src/app/interfaces';
import { AgencyService } from 'src/app/services/agency.service';
import { AgencyDeleteDialogComponent } from "../agency-delete-dialog/agency-delete-dialog.component";

interface DialogData {
  element: Agency;
}

@Component({
  selector: 'app-agency-update-dialog',
  templateUrl: './agency-update-dialog.component.html',
  styleUrls: ['./agency-update-dialog.component.scss'],
})
export class AgencyUpdateDialogComponent implements OnInit {
  newName: string = this.data.element.name;
  newAddress: string = this.data.element.address;
  newPhone: string = this.data.element.phone;
  newEmail: string = this.data.element.email;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AgencyUpdateDialogComponent>,
    private agencyService: AgencyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  predicate = (a: Agency) =>
    a.name === this.newName &&
    a.address === this.newAddress &&
    a.phone === this.newPhone &&
    a.email === this.newEmail;

  public get otherAgencies(): Agency[] {
    const condition = this.agencyService.agencies.some(this.predicate);
    const agencies = this.agencyService.agencies;
    const agency = agencies.find(this.predicate);
    const index = agencies.indexOf(agency!);

    return agencies
      .slice(0, index)
      .concat(agencies.slice(index + 1, agencies.length));
  }

  update() {
    const condition = this.otherAgencies.some(this.predicate);

    if (condition) {
      this.snackBar.open("Please type another agency data", "OK");
      this.clearAreas();
      return;
    }

    if (!this.newName || !this.newAddress || !this.newPhone || !this.newEmail) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.snackBar.open(`${this.data.element.name} successfully updated`);
    this.closeDialog();
  }

  clearAreas() {
    this.newName = this.newEmail = this.newAddress = this.newPhone = "";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog.open(AgencyDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef },
    });
  }
}
