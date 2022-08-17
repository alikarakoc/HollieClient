import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { Hotel } from 'src/app/interfaces';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { HotelService } from 'src/app/services';
import { HotelFeatureService } from 'src/app/services/hotel-feature';

interface DialogData {
  element: HotelFeature;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-hotel-feature-update-dialog',
  templateUrl: './hotel-feature-update-dialog.component.html',
  styleUrls: ['./hotel-feature-update-dialog.component.scss']
})
export class HotelFeatureUpdateDialogComponent implements OnInit {
  newCode: string = this.data.element.code;
  newName: string = this.data.element.name;
  newBabyTop: number = this.data.element.babyTop;
  newChildTop: number = this.data.element.childTop;
  newTeenTop: number = this.data.element.teenTop;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<HotelFeatureUpdateDialogComponent>,
    private hotelFeatureService: HotelFeatureService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translocoService: TranslocoService,
    private hotelService: HotelService
  ) { }

  features: HotelFeature[] =[];
  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelFeatureService.getAllFeatures().subscribe((res) => {
      if(res.data !== null){
        this.features = res.data;
      }
    });

    this.hotelService.getAllHotels().subscribe((res) => {
      if(res.data !== null){
        this.hotels = res.data;
      }
    })


  }


  update(){

    if (!this.newCode) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

     const otherAges = this.features.filter(c => c.id !== this.data.element.id);

    if (otherAges.some(c =>  c.code === this.newCode )) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'Features' : 'Özellikler' }), "OK");
      this.newCode = "";
      return;

    }

    this.snackBar.open(this.translocoService.translate('dialogs.update_success', { elementName: this.newName }));
    this.data.dialogRef?.close();
    this.data.element.code = this.newCode;
    this.data.element.name = this.newName;
    this.data.element.babyTop = this.newBabyTop;
    this.data.element.childTop = this.newChildTop;
    this.data.element.teenTop = this.newTeenTop;
    this.data.table?.renderRows();
    this.dialogRef.close({ isUpdated: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }




}
