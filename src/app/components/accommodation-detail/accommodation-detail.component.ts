import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Accommodation } from 'src/app/interfaces/accommodation';
import { TranslocoService } from "@ngneat/transloco";
import { PriceSearchDetail } from 'src/app/interfaces/price-search-detail';
import { AccommodationComponent } from 'src/app/pages';

interface DialogData {
  accommodation: Accommodation;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}
@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss']
})
export class AccommodationDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AccommodationDetailComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService
  ) { }

  accommodationDetail: Accommodation = this.data.accommodation;
  writeDetail: string;

  ngOnInit(): void {
    console.log(this.accommodationDetail.priceDetails);
    
  }

 getDetail(element: Accommodation){
    this.writeDetail = "";
    var detail: PriceSearchDetail[];
    detail = element.priceDetails;
    detail.forEach(priceDetail => {
       this.writeDetail += "Contract Id: "+priceDetail.contractId + " Day Price " + priceDetail.netPrice + '\n';
    });
    console.log(this.writeDetail);
    return this.writeDetail;
    
  }

  getContractId(element: Accommodation){
    var detail: PriceSearchDetail[];
    detail = element.priceDetails;
    return detail.map(x => x.contractId);   
  }
  getNetPrice(element: Accommodation){
    var detail: PriceSearchDetail[];
    detail = element.priceDetails;
    return detail.map(x => x.netPrice);   
  }
  

}

