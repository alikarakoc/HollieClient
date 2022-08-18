import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("ganttObject")
  public ganttObject: ContractGranttComponent | undefined;
  contracts: Contract[] = [];
  public toolbarOptions: string[] = ["Add","Edit","Update","Delete","Cancel","ExpandAll","CollapseAll","Indent","Outdent"]
  public editOptions: object =  {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    mode: "Auto"
  }
  public columnSettings: object[] = [
    {field: "code", headerText: "Contract Code"},
    {field: "name", headerText: "Name"},
    {field: "enteredDate", headerText: "Entered Date" , format: "dd-MM-yy"},
    {field: "exitDate", headerText: "Exit Date", format: "dd-MM-yy"}

  ]
  public taskSettings: object = {
    id: "code",
    name: "name",
    startDate: "enteredDate",
    endDate: "exitDate",
    duration: "Duration"
  }
  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe(res => {
      if (res.data!=null){
        this.contracts = res.data;
      }
    });
  }

}
