import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'src/app/models/socket';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private readonly SOCKETS_URL: string = 'http://localhost/sockets';

  private sockets: Subject<Socket[]> = new Subject();

  constructor(private http: HttpClient) { }

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
}
