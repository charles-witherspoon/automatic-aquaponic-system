import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GrowthData, Plant } from 'src/app/models/plants';
import { GrowthDataService } from './growth-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantDialogComponent } from '../add-plant-dialog/add-plant-dialog.component';
import { DeletePlantDialogComponent } from '../delete-plant-dialog/delete-plant-dialog.component';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-growth-data',
  templateUrl: './growth-data.component.html',
  styleUrls: ['./growth-data.component.scss']
})
export class GrowthDataComponent implements OnInit {

  //#region Private Properties
  private _plantUpdates: any = {};
  //#endregion

  //#region Public Properties
  public plants: Plant[] = [];

  public plantsForm: FormGroup;
  //#endregion

  constructor(private plantService: GrowthDataService, private dialog: MatDialog, private fb: FormBuilder) {
    this.plantsForm = this.fb.group({
      plants: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.plantService.getPlants().subscribe(plants => {
      this.plants = plants;

      let plantsArray = this.plantsForm.get('plants') as FormArray;
      this.plants.forEach(_ => plantsArray.push(this.addPlantGroup()))
    });
  }

  private addPlantGroup(): FormGroup {
    return this.fb.group({
      date: new FormControl(),
      growth: new FormControl()
    })
  }


  private cacheData(plantId: number, data: any): void {
    if (this._plantUpdates[plantId]) {
      this._plantUpdates[plantId][data.key] = data[data.key];
    } else {
      this._plantUpdates[plantId] = { [data.key]: data[data.key] };
    }
  }

  //#region Public Methods

  public setDate(event: Event, plant: Plant): void {
    let input = event.target as HTMLInputElement;
    if (input && plant.id) {
      this.cacheData(plant.id, { key: 'date', date: input.value });
    }
  }

  public setGrowth(event: Event, plant: Plant): void {
    let input = event.target as HTMLInputElement;
    if (input && plant.id) {
      this.cacheData(plant.id, { key: 'growth', growth: input.value });
    }
  }

  public onSave(): void {
    Object.keys(this._plantUpdates).forEach(id => {
      let growthData: GrowthData = this._plantUpdates[id];
      this.plantService.updatePlant(id, growthData);
    });

    window.location.reload();
  }

  public addPlant(): void {
    this.dialog.open(AddPlantDialogComponent);
  }

  public deletePlant(id: number | undefined, name: string | undefined): void {
    this.dialog.open(DeletePlantDialogComponent, { data: { id: id, name: name } });
  }
  //#region Private Methods

}
