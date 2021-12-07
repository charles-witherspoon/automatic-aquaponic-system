import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GrowthData, Plant } from 'src/app/models/plants';
import { GrowthDataService } from './growth-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantDialogComponent } from '../add-plant-dialog/add-plant-dialog.component';
import { DeletePlantDialogComponent } from '../delete-plant-dialog/delete-plant-dialog.component';
import { EditPlantDialogComponent } from '../edit-plant-dialog/edit-plant-dialog.component';
import { EChartsOption } from 'echarts';


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

  public chartOptions: EChartsOption[] = [];
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
      this.plants.forEach(plant => {
        plantsArray.push(this.addPlantGroup());
        this.chartOptions.push(this.getChartOptions(plant));
      });

      this.dialog.open(EditPlantDialogComponent, { data: { plant: plants[0] }, height: '70vh', width: '70vw', panelClass: 'custom-dialog-container' });
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
      this.cacheData(plant.id, { key: 'date', date: `'${input.value}''` });
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

  public onEditPlant(plant: Plant): void {
    this.dialog.open(EditPlantDialogComponent, { data: { plant: plant }, height: '70vh', width: '70vw' });
  }

  private getChartOptions(plant: Plant): EChartsOption {
    return {
      xAxis: {
        data: plant.growthData.map(_ => '')
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: plant.growthData.map(data => data.growth),
          type: 'line'
        }
      ]
    };
  }
}
