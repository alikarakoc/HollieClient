import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from '@angular/material/table';
import { Market } from "src/app/interfaces";
import { MarketService } from "src/app/services";
import { MarketDeleteDialogComponent } from "../market-delete-dialog/market-delete-dialog.component";

interface DialogData {
  element: Market;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-market-update-dialog',
  templateUrl: './market-update-dialog.component.html',
  styleUrls: ['./market-update-dialog.component.scss']
})
export class MarketUpdateDialogComponent implements OnInit {
  newMarketName: string = this.data.element.name;
  newMarketCode: string = this.data.element.code;


  sameCodeCheck = false;
  sameNameCheck = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MarketUpdateDialogComponent>,
    private marketService: MarketService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe(res => {
      this.markets = res.data;
    });
  }
  markets: Market[] = [];

  update() {
    if (!this.newMarketName) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }
    const otherMarkets = this.markets;

    console.log(this.markets);
    console.log(otherMarkets);


    if (otherMarkets.findIndex(c => c.name == this.newMarketName.toString() || c.code == this.newMarketCode.toString()) > -1) {
      { if (otherMarkets.some(c => c.name == this.newMarketName && c.code == this.newMarketCode )) {


          console.log(this.newMarketName);
            
            this.ngOnInit();
            return;

        }
        else{
          for (let i = 0; i < otherMarkets.length; i++){
            if(otherMarkets[i].code == this.newMarketCode && otherMarkets[i].id != this.data.element.id){
              this.sameCodeCheck = true;
            }
            if(otherMarkets[i].name == this.newMarketName && otherMarkets[i].id != this.data.element.id){
              this.sameNameCheck = true;
            }
          }
          if (this.sameCodeCheck || this.sameNameCheck){
            
            this.ngOnInit();
            return;
          }
        }

        //   const [month, day, year] = value.birthdate.split('.');
        //   if(year > 2000){
        //     console.log(value.name + " " + value.surname);
        //   }
        // });



        otherMarkets.forEach(element => {
          if (element.name == this.newMarketName || element.code == this.newMarketCode) {
            console.log(this.newMarketName);
            this.ngOnInit();
            return;
          }
        });



      }

      
      this.dialogRef.close({ isUpdated: true });
      this.data.dialogRef?.close();
      this.data.element.name = this.newMarketName;
      this.data.element.code = this.newMarketCode;
      this.marketService.updateMarket(this.data.element);
      console.log(this.data.element);
      this.data.table?.renderRows();
      this.closeDialog();
    }
    else {
      alert("Market adı var");
    }

    // const otherCategories = this.hotels.map(v => {
    //   return (v.name !== this.data.element.name && v.code !== this.data.element.name) && v;
    // });

    // if (otherCategories) {

    // }
  

  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    const dialog = this.dialog.open(MarketDeleteDialogComponent, {
      data: { element: this.data.element, dialogRef: this.dialogRef }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.isDeleted) {
        this.marketService.deleteMarket(this.data.element).subscribe(() => {
          this.ngOnInit();

        });
      } this.data.table?.renderRows();
    });
  }

}
