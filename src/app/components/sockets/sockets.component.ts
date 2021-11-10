import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SOCKET_TYPE, SOCKET_STATUS, Socket } from 'src/app/models/socket';
import { AddSocketTypeDialogComponent } from '../add-socket-type-dialog/add-socket-type-dialog.component';
import { DeleteSocketTypeDialogComponent } from '../delete-socket-type-dialog/delete-socket-type-dialog.component';
import { SocketService } from './socket.service';


@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss']
})
export class SocketsComponent implements OnInit {

  //#region Private Properties
  private _socketUpdates: any = {};
  //#endregion

  //#region Private Properties
  public sockets: Socket[] = [];

  public types: string[] = [];

  public statuses: any = SOCKET_STATUS;

  public socketsForm: FormGroup;
  //#endregion


  constructor(private socketService: SocketService, private fb: FormBuilder, private dialog: MatDialog) {
    this.socketsForm = this.fb.group({
      sockets: this.fb.array([])
    });
  }

  ngOnInit(): void {

    // Get Sockets
    this.socketService.getSockets().subscribe(sockets => {
      this.sockets = sockets;

      this.sockets.forEach(socket => {
        let sockets = this.socketsForm.get('sockets') as FormArray;
        sockets.push(this.addSocketGroup(socket));
      })
    });

    // Get Types
    this.types = this.socketService.getSocketTypes();
  }

  private addSocketGroup(socket: Socket): FormGroup {
    return this.fb.group({
      type: new FormControl(socket.type),
      status: new FormControl(socket.status)
    });
  }

  //#region Public Methods
  public setType(event: MatSelectChange, socket: any): void {
    // Update socket type
    socket.type = event.value;

    // Cache update
    let update: Socket = this._socketUpdates[socket.id]
    if (update) {
      update.type = socket.type;
    } else {
      update = {
        id: socket.id,
        type: socket.type,
        schedule: '',
        status: SOCKET_STATUS.OFF
      }
      this._socketUpdates[socket.id] = update;
    }
  }

  public setStatus(event: MatSelectChange, socket: any): void {
    // Update socket status
    let typedString = event.value as keyof typeof SOCKET_STATUS;
    socket.status = SOCKET_STATUS[typedString];

    // Cache update
    let update: Socket = this._socketUpdates[socket.id];
    if (update) {
      update.status = socket.status;
    } else {
      update = {
        id: socket.id,
        type: SOCKET_TYPE.NONE,
        schedule: '',
        status: socket.status
      }
      this._socketUpdates[socket.id] = update;
    }
  }

  public onSave(): void {
    Object.keys(this._socketUpdates).forEach(id => {
      this.socketService.updateSocket(this._socketUpdates[id]);
    });
  }


  public addSocketType(): void {
    this.dialog.open(AddSocketTypeDialogComponent);
  }

  public deleteSocketType(type: string): void {
    this.dialog.open(DeleteSocketTypeDialogComponent, { data: { type: type } });
  }

  //#endregion

}
