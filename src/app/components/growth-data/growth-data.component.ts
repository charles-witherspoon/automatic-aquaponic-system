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


  public chartOptions: Map<number | undefined, EChartsOption> = new Map();

  //#endregion

  constructor(private plantService: GrowthDataService, private dialog: MatDialog, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getPlants();
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
    this.dialog.open(EditPlantDialogComponent, { data: { plant: plant }, height: '70vh', width: '70vw', panelClass: 'custom-dialog-container' })
      .afterClosed()
      .subscribe(_ => this.getPlants());
  }

  private getChartOptions(plant: Plant): EChartsOption {
    return {
      xAxis: {
        data: plant.growthData.map(_ => '')
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: plant.growthData.sort((a, b) => a.date.localeCompare(b.date)).map(data => data.growth),
          type: 'line'
        }
      ]
    };
  }

  public plantGroups(): number[] {

    if (this.plants.length === 0)
      return [0];

    const plantGroups: number[] = [];

    for (let i = 0; i < this.plants.length; i += 5) {
      plantGroups.push(i);
    }

    return plantGroups;
  }

  private getPlants(): void {
    this.plantService.getPlants().subscribe(plants => {
      this.plants = plants;

      this.plants.forEach(plant => {
        if (plant.growthData && plant.id) {
          this.chartOptions.set(plant.id, this.getChartOptions(plant));
        }

      });

    });
  }
}
