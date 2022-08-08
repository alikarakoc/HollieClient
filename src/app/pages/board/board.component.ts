import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  columns: string[] = ['code', 'name', 'actions'];
  dataSource: MatTableDataSource<Board>;

  value = '';

  @ViewChild(MatTable) table: MatTable<Board>;
  @ViewChild(MatSort) sort: MatSort;

  Board = 'ExcelSheet.xlsx';

  boards: Board[] = [];

  constructor(
    public boardService: BoardService,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private excelService: ExcelService
  ) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.boards, 'Board');
  }
  

  ngOnInit(): void {
    this.boardService.getAllBoards().subscribe((res) => {
      if(res.data!=null){
        this.boards = res.data;
      }
      
      this.dataSource = new MatTableDataSource<Board>(this.boards);
      this.dataSource.sort = this.sort;
    });
    console.log('on init');

  }

  
  filterBoards(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    if(filterValue[0] == 'i' || filterValue[0] == 'i'){
      filterValue = filterValue.replace('i', 'İ');
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear(){
    this.ngOnInit();
  }


  create() {
    const dialog = this.dialog.open(BoardAddDialogComponent, {
      data: { table: this.table },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.boardService
          .addNewBoard({
            name: result.elementName, code: result.elementCode
          }).subscribe(() => {
            this.ngOnInit();
          });
      }
    });
  }

  update(element: Board) {
    const dialog = this.dialog.open(BoardUpdateDialogComponent, {
      data: { element }
    });

    dialog.afterClosed().subscribe(() => {
      this.boardService.updateBoard(element).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }

  delete(element: Board) {
    const dialog = this.dialog.open(BoardDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.boardService.deleteBoard(element).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });
  }
}
