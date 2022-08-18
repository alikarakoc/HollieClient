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
  public timelineSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public gridLines: string;
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
    this.timelineSettings = {
      topTier: {
          unit: 'Month',
          format: 'MMM dd, y',
      },
      bottomTier: {
          unit: 'Week',
          count: 1
      },
      
  };
  this.projectStartDate = new Date('05/01/2022');
  this.projectEndDate = new Date('07/28/2023');
  this.gridLines = 'Both';

    this.contractService.getAllContracts().subscribe(res => {
      if (res.data!=null){
        this.contracts = res.data;

      }
    });
  }

}
