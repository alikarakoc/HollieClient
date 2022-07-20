import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Agency } from "src/app/interfaces";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-agency-delete-dialog',
  templateUrl: './agency-delete-dialog.component.html',
  styleUrls: ['./agency-delete-dialog.component.scss']
})
export class AgencyDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AgencyDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.snackBar.open(`${this.data.element.name} successfully deleted.`);
    this.dialogRef.close();
    this.data.dialogRef.close();
  }

}
