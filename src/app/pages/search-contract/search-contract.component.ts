import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Contract, Hotel } from "src/app/interfaces";
import { ContractService, HotelService, ExcelService } from "src/app/services";

@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
  styleUrls: ['./search-contract.component.scss']
})
export class SearchContractComponent implements OnInit {
  columns: string[] = ["code", "name", "price", "currency", "hotel", "market", "agency", "board", "roomType", "start", "end"];
  dataSource: MatTableDataSource<Contract>;

  @ViewChild(MatTable) table: MatTable<SearchContractComponent>;

  startDate?: Date;
  endDate?: Date;
  people?: number;
  hotelIds: number[];

  constructor(
    private hotelService: HotelService,
    private contractService: ContractService,
    private excelService: ExcelService
  ) { }

  hotels: Hotel[] = [];
  contracts: Contract[] = [];
  result: Contract[] = [];

  clearTable() {
    this.result = [];
    this.table.renderRows();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.result, 'Contracts_Filtered');
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res.data;
    });


    this.contractService.getAllContracts().subscribe(res => {
      this.contracts = res.data;
    });
  }

  applyFilter() {
    this.clearTable();
    // console.log(this.startDate?.getTime(), this.endDate?.getTime());
    const dateConditions = (startDate: Date, endDate: Date): boolean => (this.startDate !== undefined && this.startDate?.getTime() <= startDate.getTime()) && (this.endDate !== undefined && this.endDate?.getTime() >= endDate.getTime());

    for (const contract of this.contracts) {
      if (dateConditions(this.toDate(contract.enteredDate), this.toDate(contract.exitDate))) {
        if (this.hotelIds.some(hI => hI === contract.hotelId)) {
          this.result.push(contract);
        }
      }
    }
    this.table.renderRows();

    // console.log(this.hotelIds);

    console.log(this.result);
  }

  clearInputs() {
  }

  toDate(v: Date | string) {
    return new Date(v);
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency", element: Contract) {
    switch (type) {
      case 'agency':
        // return element.agencyIds.map(i => this.agencies.find(a => a.id === i));
        return element.agencyId;

      case 'board':
        // return element.boardIds.map(i => this.boards.find(b => b.id === i));
        return element.boardId;

      case 'room_type':
        // return element.roomTypeIds.map(i => this.roomTypes.find(r => r.id === i));
        return element.roomTypeId;

      case 'market':
        // return element.marketIds.map(i => this.markets.find(m => m.id === i));
        return element.marketId;

      case 'hotel':
        // return this.hotels.find(h => h.id === element.hotelId)?.name;
        return element.hotelId;

      case 'currency':
        // return this.currencies.find(c => c.id === element.currencyId)?.name;
        return element.currencyId;
    }
  }
}
