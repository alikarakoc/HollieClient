import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {  Board } from 'src/app/interfaces';
import { BoardService } from "src/app/services";

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
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }

  delete() {
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
