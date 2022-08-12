import { Component, Inject, OnInit } from '@angular/core';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { HotelFeatureService } from 'src/app/services/hotel-feature';
import { Contract, Hotel } from 'src/app/interfaces';
import { ContractService, HotelService } from 'src/app/services';

interface DialogData {
  element: HotelFeature;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-feature-delete-dialog',
  templateUrl: './hotel-feature-delete-dialog.component.html',
  styleUrls: ['./hotel-feature-delete-dialog.component.scss']
})
export class HotelFeatureDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelFeatureDeleteDialogComponent>,
    private snackBar: MatSnackBar,
    public translocoService: TranslocoService,
    private hotelFeatureService: HotelFeatureService,
    private contractService: ContractService,
    private hotelService: HotelService
    ) { }

  features: HotelFeature[] =[];
  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((res) => {
      if(res.data !== null){
        this.hotels = res.data;
      }
    })


    this.hotelFeatureService.getAllFeatures().subscribe((res) => {
      if(res.data !== null) {
        this.features = res.data;
      }
    })
  }

  delete() {

    const condition = this.hotels.some(h => h.hotelFeatureId === this.data.element.id);

    if (condition) {
      this.snackBar.open('This category is using with another column.', "OK");
      return;
    }

    this.snackBar.open(this.translocoService.translate('dialogs.delete_success', { elementName: this.data.element.code }));
    this.closeDialog({ isDeleted: true });
    this.data.dialogRef?.close();
    this.data.table?.renderRows();
  }

  closeDialog({ isDeleted }: { isDeleted: boolean; }) {
    this.dialogRef.close({ isDeleted });
  }

}
