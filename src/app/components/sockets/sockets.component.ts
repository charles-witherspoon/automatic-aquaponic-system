import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
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

  private _intervalValue: number = 0;
  //#endregion

  //#region Private Properties
  public sockets: Socket[] = [];

  public types: BehaviorSubject<string[]>;

  public statuses: any = SOCKET_STATUS;

  public socketsForm: FormGroup;

  public intervalUnit: string = 'Minutes';
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
  public setType(event: MatSelectChange, socket: Socket): void {
    if (event.value === 'ADD_TYPE')
      return;

    socket.type = event.value;
    this.socketService.updateSocket(socket);
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
    this.dialog.open(SetScheduleDialogComponent, { height: '420px', maxHeight: '420px', data: { id: id } });
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

  public onTypeChange($event: any) {
    const select: HTMLSelectElement = $event as HTMLSelectElement;
    if (select.value === 'ADD_TYPE')
      this.addSocketType();
  }

  public toggleStatus(socket: Socket) {
    if (socket.status === SOCKET_STATUS.OFF)
      socket.status = SOCKET_STATUS.ON;
    else
      socket.status = SOCKET_STATUS.OFF;

    this.socketService.updateSocket(socket);
  }

  public setScheduleType(event: MatSelectChange, socket: Socket) {
    socket.scheduleType = event.value;
    this.socketService.updateSocket(socket);
  }

  public setIntervalValue(event: MatSliderChange): void {
    if (event.value) {
      this._intervalValue = event.value;
    }
  }

  public setIntervalUnit(slider: MatSlider, unit: string): void {
    slider.value = 1;
    this._intervalValue = 1;
    this.intervalUnit = unit;
  }

  public saveInterval(id: number): void {
    if (this._intervalValue <= 0)
      return;

    this.socketService.clearSchedules(id);

    let min = '0';
    let hr = '*';

    if (this.intervalUnit === 'MINUTE') {
      min = `*/${this._intervalValue}`
    }
    else {
      hr = `*/${this._intervalValue}`
    }

    let cronExpr = `${min} ${hr} * * *`;

    console.log(cronExpr);
    this.socketService.addSchedule(cronExpr, id, -1);
  }
}
