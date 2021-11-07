import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

const PLANTS = [
  {
    name: "Plant A",
    growthData: [],
  },
  {
    name: "Plant B",
    growthData: [],
  },
  {
    name: "Plant C",
    growthData: [],
  },
  {
    name: "Plant D",
    growthData: [],
  },
  {
    name: "Plant E",
    growthData: [],
  },
];

@Component({
  selector: 'app-growth-data',
  templateUrl: './growth-data.component.html',
  styleUrls: ['./growth-data.component.scss']
})
export class GrowthDataComponent implements OnInit {

  //#region Private Properties

  public plants: any = PLANTS;

  public plantsForm: FormGroup = new FormGroup({});
  //#endregion

  constructor() { }

  ngOnInit(): void {
  }

  //#region Public Methods

  public onSave() {
    console.log('save')
  }
  //#region Private Methods

}
