import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { SOCKET_STATUS, Socket } from 'src/app/models/socket';
import { AddSocketTypeDialogComponent } from '../add-socket-type-dialog/add-socket-type-dialog.component';
import { DeleteSocketTypeDialogComponent } from '../delete-socket-type-dialog/delete-socket-type-dialog.component';
import { SetScheduleDialogComponent } from '../set-schedule-dialog/set-schedule-dialog.component';
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

  public types: BehaviorSubject<string[]>;

  public statuses: any = SOCKET_STATUS;

  public socketsForm: FormGroup;
  //#endregion


  constructor(private socketService: SocketService, private fb: FormBuilder, private dialog: MatDialog) {
    this.socketsForm = this.fb.group({
      sockets: this.fb.array([])
    });
    this.types = this.socketService.socketTypes;
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
        status: socket.status
      }
      this._socketUpdates[socket.id] = update;
    }
  }

  public setStatus(status: string, socket: any): void {
    // Update socket status
    socket.status = status;

    // Cache update
    let update: Socket = this._socketUpdates[socket.id];
    if (update) {
      update.status = socket.status;
    } else {
      update = {
        id: socket.id,
        type: socket.type,
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
    let dialogRef = this.dialog.open(DeleteSocketTypeDialogComponent, { data: { type: type } });

    dialogRef.afterClosed()
      .subscribe(typeWasDeleted => {
        if (typeWasDeleted) {
          this.removeSocketTypeFromSockets(type);
        }
      });
  }

  public setSchedule(id: any) {
    this.dialog.open(SetScheduleDialogComponent, { height: '420px', maxHeight: '420px', data: { id: 1 } })
  }

  //#endregion


  private removeSocketTypeFromSockets(type: string): void {
    this.sockets.forEach(socket => {
      if (!socket.id)
        return;

      if (socket.type === type) {
        socket.type = 'NONE';

        if (!this._socketUpdates[socket.id]) {
          this._socketUpdates[socket.id] = socket;
        }
      }
    })
  }
}
