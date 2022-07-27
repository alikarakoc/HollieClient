import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import { Board } from "src/app/interfaces";
import { BoardService } from "src/app/services";
import { BoardDeleteDialogComponent } from "../board-delete-dialog/board-delete-dialog.component";

interface DialogData {
  element: Board;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-board-update-dialog',
  templateUrl: './board-update-dialog.component.html',
  styleUrls: ['./board-update-dialog.component.scss']
})
export class BoardUpdateDialogComponent implements OnInit {

  newBoardName: string = this.data.element.name;
  newBoardCode: string = this.data.element.code;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<BoardUpdateDialogComponent>,
    private boardService: BoardService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.boardService.getAllBoards().subscribe(res => {
      this.boards = res.data;
    });
  }
  boards: Board[] = [];

  update() {
    if (!this.newBoardName) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.boardService.getAllBoards().subscribe(res => {
      const otherMarkets = res.data.filter(v => v.id !== this.data.element.id);
      if (otherMarkets.some(c => c.code === this.newBoardCode)) {
        this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === "en" ? "board" : "tablo" }), "OK");
        this.newBoardName = "";
        this.newBoardCode = "";
        return;
      }
    });

    this.snackBar.open(this.translocoService.translate('dialogs.update_success'));
    this.data.dialogRef?.close();
    this.data.element.code = this.newBoardCode;
    this.data.element.name = this.newBoardName;

    console.log(this.data.element);
    this.data.table?.renderRows();
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    const dialog = this.dialog.open(BoardDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.boardService.deleteBoard({ code: this.newBoardCode, name: this.newBoardName }).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
