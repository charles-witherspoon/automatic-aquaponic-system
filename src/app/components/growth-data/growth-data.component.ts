import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MOCK_PLANTS } from 'src/app/models/plants';


@Component({
  selector: 'app-growth-data',
  templateUrl: './growth-data.component.html',
  styleUrls: ['./growth-data.component.scss']
})
export class GrowthDataComponent implements OnInit {

  //#region Private Properties

  public plants: any = MOCK_PLANTS;

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
