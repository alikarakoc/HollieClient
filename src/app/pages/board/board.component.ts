import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TranslocoService } from "@ngneat/transloco";
import {
  BoardAddDialogComponent,
  BoardDeleteDialogComponent,
  BoardUpdateDialogComponent,

} from 'src/app/components';
import { Board } from 'src/app/interfaces';
import { BoardService } from 'src/app/services';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  columns: string[] = ['code','name', 'actions'];
  @ViewChild(MatTable) table: MatTable<Board>;

  Board= 'ExcelSheet.xlsx';

  boards: Board[] = [];

  constructor(
    public boardService: BoardService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService:ExcelService
  ) { }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.boards, 'Board');
  }

  ngOnInit(): void {
    this.boardService.getAllBoards().subscribe((res) => {
      this.boards = res.data;
    });
    console.log('on init');

  }

  create() {
    const dialog = this.dialog.open(BoardAddDialogComponent,{
      data: {table: this.table},
    });

  dialog.afterClosed().subscribe((result) => {
    if(result.isAdded){
      this.boardService
      .addNewBoard({
        name: result.elementName, code: result.elementCode
      }).subscribe(()=> {
        this.ngOnInit();
      });
    }
  });
  }

  update(element: Board) {
    const dialog = this.dialog.open(BoardUpdateDialogComponent, {
      data: { element }
    });

    dialog.afterClosed().subscribe(()=> {
      this.boardService.updateBoard(element).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }

  delete(element: Board){
    const dialog = this.dialog.open(BoardDeleteDialogComponent, {
      data: {element},
    });
    dialog.afterClosed().subscribe((result) => {
      if(result.isDeleted){
        this.boardService.deleteBoard(element).subscribe((res:any) =>{
          this.ngOnInit();
        });
      }
    });
  }
}
