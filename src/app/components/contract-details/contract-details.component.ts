import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contract } from "src/app/interfaces";


interface DialogData {
  hotels: any[];
  markets: any[];
  agencies: any[];
  boards: any[];
  currencies: any[];
  hotelCategories: any[];
  roomTypes: any[];
  cMarkets: any[];
  cAgencies: any[];
  cBoards: any[];
  cRoomTypes: any[];

  contract: Contract;
}

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  contract: Contract;
  hotels: any[];
  markets: any[];
  agencies: any[];
  boards: any[];
  currencies: any[];
  hotelCategories: any[];
  roomTypes: any[];
  cMarkets: any[];
  cAgencies: any[];
  cBoards: any[];
  cRoomTypes: any[];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.contract = this.data.contract;
    this.markets = this.data.markets;
    this.agencies = this.data.agencies;
    this.boards = this.data.boards;
    this.roomTypes = this.data.roomTypes;
  }

  toDate(v: string | Date): Date {
    return new Date(v);
  }

  ngOnInit(): void {
    
  }

  getItem(type: "agency" | "board" | "room_type" | "market" | "hotel" | "currency") {
    const element = this.contract;
    switch (type) {
      case 'agency':
        const idAgency = this.data.cAgencies.filter(cA => cA.listId === element.id).map(cA => cA.agencyId);
        return idAgency.map(i => this.agencies.find(a => a.id === i).name);

      case 'board':
        const idBoard = this.data.cBoards.filter(cB => cB.listId === element.id).map(cB => cB.boardId);
        return idBoard.map(i => this.boards.find(b => b.id === i).name);

      case 'room_type':
        const idRoom = this.data.cRoomTypes.filter(cR => cR.listId === element.id).map(cR => cR.roomTypeId);
        return idRoom.map(i => this.roomTypes.find(r => r.id === i).name);

      case 'market':
        const idMarket = this.data.cMarkets.filter(cM => cM.listId === element.id).map(cM => cM.marketId);
        return idMarket.map(i => this.markets.find(m => m.id === i).name);

      case 'hotel':
        return this.data.hotels.find(h => h.id === element.hotelId)?.name;

      case 'currency':
        return this.data.currencies.find(c => c.id === element.currencyId)?.code;
    }
} 
}