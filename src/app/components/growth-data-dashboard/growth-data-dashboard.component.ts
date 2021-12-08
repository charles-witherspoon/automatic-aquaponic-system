import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Plant } from 'src/app/models/plants';
import { GrowthDataService } from '../growth-data/growth-data.service';

@Component({
  selector: 'app-growth-data-dashboard',
  templateUrl: './growth-data-dashboard.component.html',
  styleUrls: ['./growth-data-dashboard.component.scss']
})
export class GrowthDataDashboardComponent implements OnInit {

  public plants: Plant[] = [];

  public chartOptions: Map<number | undefined, EChartsOption> = new Map();

  constructor(private plantService: GrowthDataService) { }

  ngOnInit(): void {
    this.getPlants();
  }

  private getPlants(): void {
    this.plantService.getPlants().subscribe(plants => {
      this.plants = plants;

      this.plants.forEach(plant => {
        if (plant.growthData && plant.id) {
          this.chartOptions.set(plant.id, this.getChartOptions(plant));
        }
      })
    })
  }

  private getChartOptions(plant: Plant): EChartsOption {
    return {
      xAxis: {
        data: plant.growthData.map(data => data.date)
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
    }
  }
}
