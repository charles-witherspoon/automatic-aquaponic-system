import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

enum TYPES {
  WATER_PUMP = "WATER PUMP",
  LIGHT = "LIGHT",
  AERATOR = "AERATOR",
  HEATER = "HEATER",
  NONE = "NONE",
};

enum STATUS {
  ON = "ON",
  OFF = "OFF",
  UNUSED = "UNUSED",
};

var SOCKETS = [
  {
    id: 1,
    type: TYPES.HEATER,
    schedule: {},
    status: STATUS.ON,
  },
  {
    id: 2,
    type: TYPES.WATER_PUMP,
    schedule: {},
    status: STATUS.OFF,
  },
  {
    id: 3,
    type: TYPES.LIGHT,
    schedule: {},
    status: STATUS.OFF,
  },
  {
    id: 4,
    type: TYPES.NONE,
    schedule: {},
    status: STATUS.UNUSED,
  },
  {
    id: 5,
    type: TYPES.NONE,
    schedule: {},
    status: STATUS.UNUSED,
  },
  {
    id: 6,
    type: TYPES.NONE,
    schedule: {},
    status: STATUS.UNUSED,
  },
  {
    id: 7,
    type: TYPES.NONE,
    schedule: {},
    status: STATUS.UNUSED,
  },
  {
    id: 8,
    type: TYPES.NONE,
    schedule: {},
    status: STATUS.UNUSED,
  },
];

@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss']
})
export class SocketsComponent implements OnInit {

  //#region Private Properties

  public currentSocket: any = null;

  public sockets: any = SOCKETS;

  public types: any = TYPES;

  public statuses: any = STATUS;

  public socketsForm: FormGroup = new FormGroup({});
  //#endregion


  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    let group: any = {}
    SOCKETS.forEach(socket => {
      group[`socket${socket.id}_type`] = new FormControl(socket.type);
      group[`socket${socket.id}_status`] = new FormControl(socket.status);
    })

    this.socketsForm = new FormGroup(group);
  }


  //#region Public Methods

  public changeType(id: number): void {

  }

  public onSelect() {

  }

  public setType(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof TYPES;
    socket.type = TYPES[typedString];
  }

  public setStatus(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof STATUS;
    socket.status = STATUS[typedString];
  }
  public onSave(): void {
    console.log('save')
  }
  //#endregion

}
