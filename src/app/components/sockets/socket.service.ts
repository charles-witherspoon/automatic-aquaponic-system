import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'src/app/models/socket';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private readonly SOCKETS_URL: string = 'http://charlesraspi/sockets';

  // private readonly TYPES_URL: string = 'http://charlesraspi/types';

  // private readonly SCHEDULES_URL: string = 'http://charlesraspi/schedules';

  private readonly SOCKETS_URL: string = 'http://localhost/sockets';

  private readonly TYPES_URL: string = 'http://localhost/types';

  private readonly SCHEDULES_URL: string = 'http://localhost/schedules';

  private sockets: Subject<Socket[]> = new Subject();

  private _types: any[] = [];
  private types: BehaviorSubject<string[]> = new BehaviorSubject(['uninitialized']);

  private schedules: Subject<any[]> = new Subject();

  constructor(private http: HttpClient) {
    this.fetchTypes();
  }

  public get socketTypes() {
    return this.types;
  }


  //#region Sockets
  public getSockets(): Subject<Socket[]> {
    this.fetchSockets();
    return this.sockets;
  }

  public fetchSockets(): void {
    this.http.get<Socket[]>(this.SOCKETS_URL)
      .subscribe(sockets => {
        this.sockets.next(sockets);
      });
  }

  public updateSocket(socketUpdate: Socket): void {
    this.http.post<Socket>(this.SOCKETS_URL, socketUpdate)
      .subscribe();
  }

  //#endregion


  //#region Socket Types
  public fetchTypes(): void {
    this.http.get<any[]>(this.TYPES_URL)
      .subscribe(types => {
        this._types = types;
        let values = this._types.map(t => t.value);
        this.types.next(values);
      });
  }

  public addSocketType(type: string) {
    this.http.post<any>(this.TYPES_URL, { value: type }).subscribe(_ => this.fetchTypes());
  }

  public deleteSocketType(value: string) {
    const id = this._types.find(type => type.value === value).id;
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.TYPES_URL, { params: params }).subscribe(_ => this.fetchTypes());
  }

  //#endregion

  //#region Schedules

  public getSchedules(): Subject<any[]> {
    this.fetchSchedules();
    return this.schedules;
  }

  public fetchSchedules(): void {
    this.http.get<any[]>(this.SCHEDULES_URL).subscribe(schedules => this.schedules.next(schedules));
  }

  public addSchedule(cronString: string, socketId: number, status: number) {
    this.http.post<any>(this.SCHEDULES_URL, { cronString: cronString, socketId: socketId, onStatus: status }).subscribe();
  }

  public clearSchedules(id: number) {
    let params: HttpParams = new HttpParams().set('id', id);
    this.http.delete(this.SCHEDULES_URL, { params: params }).subscribe();
  }
  //#endregion

}
