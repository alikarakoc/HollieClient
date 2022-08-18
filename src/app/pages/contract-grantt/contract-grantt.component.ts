import { Component, OnInit } from '@angular/core';
import { projectNewData } from '../../data';
import { Contract } from 'src/app/interfaces';
import { ContractService} from 'src/app/services';

@Component({
  selector: 'app-contract-grantt',
  templateUrl: './contract-grantt.component.html',
  styleUrls: ['./contract-grantt.component.scss']
})
export class ContractGranttComponent implements OnInit {
  constructor(
    private contractService: ContractService,
  ) { }
  contracts: Contract[] = [];
  public taskSettings: object = {
    id: "id",
    name: "name",
    startDate: "enteredDate",
    endDate: "exitDate",
  }
  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data!=null){
        this.contracts = res.data;
      }
    });
  }
}
