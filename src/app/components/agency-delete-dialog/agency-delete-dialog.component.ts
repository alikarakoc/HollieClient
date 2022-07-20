import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Agency } from "src/app/interfaces";
import { AgencyService } from "src/app/services";
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
    private agencyService: AgencyService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }
  
  delete() {
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted : true});
    this.data.dialogRef.close();
    this.agencyService.deleteAgency(this.data.element);
    console.log("deleted agency");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({isDeleted} : { isDeleted : boolean;}) {
    this.dialogRef.close({ isDeleted})
  }
}
