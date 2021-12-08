import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, mergeMap, forkJoin } from 'rxjs';
import { GrowthData, Plant } from 'src/app/models/plants';

@Injectable({
  providedIn: 'root'
})
export class GrowthDataService {

  // private readonly PLANTS_URL: string = 'http://charlesraspi/plants';

  private readonly PLANTS_URL: string = 'http://localhost/plants';

  private readonly GROWTH_DATA_URL: string = 'http://localhost/growth-data';

  private plants: Subject<Plant[]> = new Subject();

  constructor(private http: HttpClient) { }

  public getPlants(): Subject<Plant[]> {
    this.fetchPlants();
    return this.plants;
  }

  public fetchPlants() {
    this.http.get<Plant[]>(this.PLANTS_URL)
      .subscribe(plants => this.plants.next(plants));
  }

  public addPlant(name: string): void {
    this.http.post(`${this.PLANTS_URL}`, { name: name }).subscribe(_ => this.fetchPlants());
  }

  public deletePlant(id: number): void {
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.PLANTS_URL, { params: params }).subscribe(_ => this.fetchPlants());
  }

  public updatePlant(id: number | string, data: GrowthData): void {
    let update: any = {
      id: id,
      growthData: data
    }

    this.http.post<any>(this.PLANTS_URL, update)
      .subscribe();
  }

  public addGrowthData(data: GrowthData[]): void {
    this.http.post<any>(this.GROWTH_DATA_URL, data).subscribe();
  }

  public deleteGrowthData(id: number): void {
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.GROWTH_DATA_URL, { params: params }).subscribe(_ => this.fetchPlants());
  }
}
