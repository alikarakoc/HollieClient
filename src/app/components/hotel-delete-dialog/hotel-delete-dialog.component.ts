import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Hotel , Contract } from "src/app/interfaces";
import { HotelService, ContractService } from "src/app/services";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Hotel;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-delete-dialog',
  templateUrl: './hotel-delete-dialog.component.html',
  styleUrls: ['./hotel-delete-dialog.component.scss']
})
export class HotelDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
    public translocoService: TranslocoService,
    private contractService: ContractService

  ) { }

  contracts: Contract[];

  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
    })
  }

  delete() {
    const condition = this.contracts.some(c => c.agencyId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.hotelService.deleteHotel(this.data.element);
    console.log("deleted hotel");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }

}
