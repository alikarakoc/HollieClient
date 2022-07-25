import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { ContractAddDialogComponent, ContractDeleteDialogComponent, ContractUpdateDialogComponent } from "src/app/components";
import { Contract } from 'src/app/interfaces';
import { ContractService } from 'src/app/services';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end", "actions"];
  @ViewChild(MatTable) table : MatTable<Contract>;
  contracts: Contract[] = [];
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

  create() {
    console.log(this.contracts);
    const dialog = this.dialog.open(ContractAddDialogComponent, {data : {table : this.table}});
  
    dialog.afterClosed().subscribe((result) => {
      if (result.isAdded){
        this.contractService
        .addContract(result.element)
        .subscribe(() =>{
          this.ngOnInit();
        });

        console.log(result.element);
      }
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

  update(element: Contract) {
    const dialog =this.dialog.open(ContractUpdateDialogComponent, {data : {element}});
  dialog.afterClosed().subscribe(result=> {
    if(result.isUpdated){
      this.contractService.updateContract(element).subscribe(() =>this.ngOnInit());
    }
  })
  }


}
