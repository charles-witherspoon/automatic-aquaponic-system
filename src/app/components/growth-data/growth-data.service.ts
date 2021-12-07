import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GrowthData, Plant } from 'src/app/models/plants';

@Injectable({
  providedIn: 'root'
})
export class GrowthDataService {

  // private readonly GROWTH_DATA_URL: string = 'http://charlesraspi/plants';

  private readonly GROWTH_DATA_URL: string = 'http://localhost/plants';

  private plants: Subject<Plant[]> = new Subject();

  constructor(private http: HttpClient) { }

  public getPlants(): Subject<Plant[]> {
    this.fetchPlants();
    return this.plants;
  }

  public fetchPlants(): void {
    this.http.get<Plant[]>(this.GROWTH_DATA_URL)
      .subscribe(plants => {
        plants.forEach(plant => {
          if (plant.growthData) {
            const growthDataString: any = plant.growthData;
            const growthData: string[] = growthDataString.split('|');
            const plantData: GrowthData[] = growthData.map(data => JSON.parse(data));
            plant.growthData = plantData;
          }
        })
        this.plants.next(plants)
      });
  }

  public addPlant(name: string): void {
    this.http.post(`${this.GROWTH_DATA_URL}`, { name: name }).subscribe(_ => this.fetchPlants());
  }

  public deletePlant(id: number): void {
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.GROWTH_DATA_URL, { params: params }).subscribe(_ => this.fetchPlants());
  }

  public updatePlant(id: number | string, data: GrowthData): void {
    let update: any = {
      id: id,
      growthData: data
    }

    console.log(update);

    this.http.post<any>(this.GROWTH_DATA_URL, update)
      .subscribe();
  }
}
