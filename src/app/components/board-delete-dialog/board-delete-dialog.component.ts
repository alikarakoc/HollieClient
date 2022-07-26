import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {  Board, Contract } from 'src/app/interfaces';
import { BoardService, ContractService } from "src/app/services";

interface DialogData {
  element: Board;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-board-delete-dialog',
  templateUrl: './board-delete-dialog.component.html',
  styleUrls: ['./board-delete-dialog.component.scss']
})
export class BoardDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<BoardDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    private boardService: BoardService,
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
    const condition = this.contracts.some(c => c.boardId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }
    this.snackBar.open(this.translocoService.translate('dialogs.delete_success'));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.boardService.deleteBoard(this.data.element);
    console.log("deleted board");
    console.log(this.data.element);
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }
}
