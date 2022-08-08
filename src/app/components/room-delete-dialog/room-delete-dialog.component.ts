import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { Contract } from "src/app/interfaces";
import { Room} from "src/app/interfaces/room";
import { ContractService } from "src/app/services";
import { RoomService } from "src/app/services/room.service";
import { TranslocoService } from '@ngneat/transloco';

interface DialogData {
  element: Room;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-room-delete-dialog',
  templateUrl: './room-delete-dialog.component.html',
  styleUrls: ['./room-delete-dialog.component.scss']
})
export class RoomDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<RoomDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private roomService: RoomService,
    public translocoService: TranslocoService,
    private contractService: ContractService

  ) { }

  contracts: Contract[];

  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data !== null) this.contracts = res.data;
      else this.contracts = [];
    });
  }

  delete() {
    //const condition = this.contracts.some(c => c.roomId === this.data.element.id);

   // if (condition) {
  //    this.snackBar.open('This category is using with another column.', "OK");
    //  return;
   // }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.name }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.roomService.deleteRoom(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }

}
