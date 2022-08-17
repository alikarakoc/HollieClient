import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Agency, Contract } from "src/app/interfaces";
import { AgencyService, ContractService } from "src/app/services";
import { CAgencyService } from 'src/app/services/cagency.service';
import { CAgency } from 'src/app/interfaces/cagency';
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
    public translocoService: TranslocoService,
    private contractService: ContractService,
    private cagencyservice: CAgencyService
  ) { }

  cagency: CAgency[];

  ngOnInit(): void {
    this.cagencyservice.getAllCAgencies().subscribe(res => {
      if (res.data !== null) this.cagency = res.data;
      else this.cagency = [];
    });
  }

  delete() {
    const condition = this.cagency.some(c => c.agencyId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef.close();
    this.agencyService.deleteAgency(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
