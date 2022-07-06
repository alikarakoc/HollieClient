import { Component, OnInit } from '@angular/core';

interface ExampleData {
  code: string;
  name: string;
}

const exampleData: ExampleData[] = [
  {
    name: "Suite",
    code: "1"
  },
  {
    name: "Family",
    code: "2"
  },
  {
    name: "Single",
    code: "3"
  }
];

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {
  columns: string[] = ["name", "code", "actions"];
  source = exampleData;

  constructor() { }

  ngOnInit(): void {
  }

}
