import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { GrowthData, Plant } from 'src/app/models/plants';
import { GrowthDataService } from '../growth-data/growth-data.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-edit-plant-dialog',
  templateUrl: './edit-plant-dialog.component.html',
  styleUrls: ['./edit-plant-dialog.component.scss']
})
export class EditPlantDialogComponent implements OnInit {

  public chartOption: EChartsOption = {};

  public plant: Plant;

  public growthDataForm: FormGroup;

  public displayedColumns: string[] = ['date', 'growth', 'delete'];

  public growthDataSource: MatTableDataSource<GrowthData> = new MatTableDataSource<GrowthData>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private plantService: GrowthDataService) {
    this.plant = this.data.plant;
    this.growthDataForm = this.fb.group({
      data: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.refreshGrowthData();
  }

  public addGrowthData() {
    this.growthData().push(this.newGrowthData());
  }

  private newGrowthData(): FormGroup {
    return this.fb.group({
      date: '',
      growth: ''
    })
  }

  public growthData(): FormArray {
    return this.growthDataForm.get('data') as FormArray;
  }

  public saveGrowthData(): void {
    const plantData: GrowthData[] = [];
    this.growthData()['controls'].forEach(control => {
      const date = control.get('date')?.value;
      const growth = control.get('growth')?.value;
      if (date && growth) {
        const growthData: GrowthData = { date: date, growth: growth };
        plantData.push(growthData);
        if (!this.plant.growthData)
          this.plant.growthData = [];
        this.plant.growthData.push(growthData);
      }
    });


    plantData.forEach(pd => {
      this.plantService.updatePlant(`${this.plant.id}`, pd);
    })

    this.refreshGrowthData();
    this.growthData()['controls'] = [];
  }

  private updateChart(): void {
    this.chartOption = {
      xAxis: {
        data: this.plant.growthData.map(data => data.date)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.plant.growthData.map(data => data.growth),
          type: 'line'
        }
      ]
    }
  }

  public deleteGrowthData(element: any): void {
    this.plant.growthData = this.plant.growthData.filter(data => data !== element);

    // TODO: Update PHP file to delete growth data
  }

  public removeFormField(index: number): void {
    this.growthData()['controls'].splice(index, 1);
  }

  private refreshGrowthData(): void {
    if (this.plant.growthData) {
      this.plant.growthData = this.plant.growthData.sort((a, b) => a.date.localeCompare(b.date));
      this.growthDataSource.data = this.plant.growthData;
      this.updateChart();
    }
  }
}
