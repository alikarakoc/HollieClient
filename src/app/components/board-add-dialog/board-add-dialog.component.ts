import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { TranslocoService } from "@ngneat/transloco";
import { Board } from "src/app/interfaces";
import { BoardService } from "src/app/services";

interface DialogData {
  table: MatTable<Board>;
}

@Component({
  selector: 'app-board-add-dialog',
  templateUrl: './board-add-dialog.component.html',
  styleUrls: ['./board-add-dialog.component.scss']
})
export class BoardAddDialogComponent implements OnInit {
  boardName: string;
  boardCode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BoardAddDialogComponent>,
    private boardService: BoardService,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
  }
  add() {


    if (!this.boardCode || !this.boardName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.boardService.getAllBoards().subscribe((res: { data: { code: string; }[]; }) => {
      // categories = res.data;
      if (res.data !== null && res.data.some((c: { code: string; }) => c.code === this.boardCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: 'board' }), "OK");
        this.boardCode = "";
        return;

      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { elementName: this.boardName }));

    this.closeDialog();
    this.data.table.renderRows();
  }

  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      elementName: this.boardName,
      elementCode: this.boardCode,
      createdUser : localStorage.getItem("username")
    });
  }
}
