import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';
import { ContractService } from 'src/app/services';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end", "actions"];
  contracts: Contract[] = [];
  @ViewChild(MatTable) table: MatTable<Contract>;
  constructor(
    public contractService: ContractService,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }
  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe((res) => {
      this.contracts = res.data;
    });
    console.log('on init');

  }

  toDate(v: string) {
    return new Date(v);
  }

  create() {
    const dialog = this.dialog.open(ContractAddDialogComponent, {
      data: { table: this.table },
    });
  }

  delete(element: Contract) {
    const dialog = this.dialog.open(ContractDeleteDialogComponent, {
      data: { element },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.isDeleted) {
        this.contractService.deleteContract(element).subscribe((res: any) => {
          console.log(element);
          this.ngOnInit();
        });
      }
    });
  }

  update(element: Contract) { }
}
