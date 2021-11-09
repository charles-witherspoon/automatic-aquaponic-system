import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Plant } from 'src/app/models/plants';
import { GrowthDataService } from './growth-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantDialogComponent } from '../add-plant-dialog/add-plant-dialog.component';
import { DeletePlantDialogComponent } from '../delete-plant-dialog/delete-plant-dialog.component';


@Component({
  selector: 'app-growth-data',
  templateUrl: './growth-data.component.html',
  styleUrls: ['./growth-data.component.scss']
})
export class GrowthDataComponent implements OnInit {

  //#region Private Properties

  public plants: Plant[] = [];

  public plantsForm: FormGroup = new FormGroup({});
  //#endregion

  constructor(private plantService: GrowthDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.plantService.getPlants().subscribe(plants => {
      this.plants = plants;
    });
  }

  //#region Public Methods

  public onSave(): void {
    console.log('save')
  }

  public addPlant(): void {
    this.dialog.open(AddPlantDialogComponent);
  }

  public deletePlant(id: number | undefined, name: string | undefined): void {
    this.dialog.open(DeletePlantDialogComponent, { data: { id: id, name: name } });
  }
  //#region Private Methods

}
