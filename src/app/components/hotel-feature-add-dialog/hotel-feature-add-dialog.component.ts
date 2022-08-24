import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { TranslocoService } from '@ngneat/transloco';
import { HotelFeature } from 'src/app/interfaces/hotel-feature';
import { HotelService } from 'src/app/services';
import { HotelFeatureService } from 'src/app/services/hotel-feature';


interface DialogData {
  table: MatTable<HotelFeature>;
}

@Component({
  selector: 'app-hotel-feature-add-dialog',
  templateUrl: './hotel-feature-add-dialog.component.html',
  styleUrls: ['./hotel-feature-add-dialog.component.scss']
})
export class HotelFeatureAddDialogComponent implements OnInit {
  code: string;
  name: string;
  babyTop: number;
  childTop: number;
  teenTop: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HotelFeatureAddDialogComponent>,
    private hotelFeatureService: HotelFeatureService,
    public translocoService: TranslocoService,
    private hotelService: HotelService
  ) { }

  hotels: any[] = [];

  ngOnInit(): void {

    this.hotelService.getAllHotels().subscribe(res => {
      if (res.data !== null) this.hotels = res.data;
      else this.hotels = [];
    });
  }

  add(){
    if (!this.code || !this.name || !this.babyTop || !this.childTop || !this.teenTop) {
      this.snackBar.open(this.translocoService.translate('dialogs.error_required'), "OK");
      return;
    }

    this.hotelFeatureService.getAllFeatures().subscribe((res) => {
      if(res.data !== null && res.data.some(f =>
        f.code === this.code ||
        f.name === this.name ||
        f.babyTop === this.babyTop ||
        f.childTop === this.childTop ||
        f.teenTop === this.teenTop )){
          this.snackBar.open(this.translocoService.translate('dialogs.error_same', { name: this.translocoService.getActiveLang() === 'en' ? 'hotel feature' : 'otel özelliği' }), "OK");
        this.code = "";
        return;
        }
    });
    this.snackBar.open(this.translocoService.translate('dialogs.add_success', { code: this.code }));

    this.closeDialog();
    this.data.table.renderRows();

  }
  closeDialog() {
    this.dialogRef.close({
      isAdded: true,
      code: this.code,
      name: this.name,
      babyTop: this.babyTop,
      childTop: this.childTop,
      teenTop: this.teenTop,
      createdUser : localStorage.getItem("username")
    });
  }

}
