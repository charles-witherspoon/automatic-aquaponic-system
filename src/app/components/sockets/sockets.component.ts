import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { SOCKET_TYPE, SOCKET_STATUS, Socket } from 'src/app/models/socket';
import { SocketService } from './socket.service';


@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss']
})
export class SocketsComponent implements OnInit {

  //#region Private Properties
  public sockets: Socket[] = [];

  public types: any = SOCKET_TYPE;

  public statuses: any = SOCKET_STATUS;

  public socketsForm: FormGroup;
  //#endregion


  constructor(private socketService: SocketService, private fb: FormBuilder) {
    this.socketsForm = this.fb.group({
      sockets: this.fb.array([])
    });
  }

  private addSocketGroup(socket: Socket): FormGroup {
    return this.fb.group({
      type: new FormControl(socket.type),
      status: new FormControl(socket.status)
    });
  }

  ngOnInit(): void {
    this.socketService.getSockets().subscribe(sockets => {
      this.sockets = sockets;

      this.sockets.forEach(socket => {
        let sockets = this.socketsForm.get('sockets') as FormArray;
        sockets.push(this.addSocketGroup(socket));
      })
    });
  }


  //#region Public Methods

  public populateSockets(): void {
    this.socketService.getSockets().subscribe(sockets => this.sockets = sockets);
  }

  public setType(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof SOCKET_TYPE;
    socket.type = SOCKET_TYPE[typedString];
  }

  public setStatus(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof SOCKET_STATUS;
    socket.status = SOCKET_STATUS[typedString];
  }

  public onSave(): void {
    let form = this.socketsForm.get('sockets') as FormArray;

    let sockets: any[] = form['controls'];

    if (sockets) {
      for (let i = 0; i < sockets.length; i++) {
        let controls = sockets[i]['controls'];
        let socket: any = {
          id: i + 1,
          type: controls['type'].value,
          schedule: '{}',
          status: controls['status'].value
        }

        this.socketService.updateSocket(socket);
      }
    }
  }

  //#endregion

}
