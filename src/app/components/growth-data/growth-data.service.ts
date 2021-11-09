import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Plant } from 'src/app/models/plants';

@Injectable({
  providedIn: 'root'
})
export class GrowthDataService {

  private readonly GROWTH_DATA_URL: string = 'http://localhost/plants';

  private plants: Subject<Plant[]> = new Subject();

  constructor(private http: HttpClient) { }

  public getPlants(): Subject<Plant[]> {
    this.fetchPlants();
    return this.plants;
  }

  public fetchPlants(): void {
    this.http.get<Plant[]>(this.GROWTH_DATA_URL)
      .subscribe(plants => this.plants.next(plants));
  }

  public addPlant(name: string): void {
    this.http.post(`${this.GROWTH_DATA_URL}`, { name: name }).subscribe(_ => this.fetchPlants());
  }

  public deletePlant(id: number): void {
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.GROWTH_DATA_URL, { params: params }).subscribe(_ => this.fetchPlants());
  }
}
