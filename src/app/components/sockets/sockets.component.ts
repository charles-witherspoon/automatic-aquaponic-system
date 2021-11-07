import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { SOCKET_TYPE, SOCKET_STATUS, MOCK_SOCKETS } from 'src/app/models/socket';


@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss']
})
export class SocketsComponent implements OnInit {

  //#region Private Properties

  public currentSocket: any = null;

  public sockets: any = MOCK_SOCKETS;

  public types: any = SOCKET_TYPE;

  public statuses: any = SOCKET_STATUS;

  public socketsForm: FormGroup = new FormGroup({});
  //#endregion


  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    let group: any = {}
    MOCK_SOCKETS.forEach(socket => {
      group[`socket${socket.id}_type`] = new FormControl(socket.type);
      group[`socket${socket.id}_status`] = new FormControl(socket.status);
    })

    this.socketsForm = new FormGroup(group);
  }


  //#region Public Methods
  public setType(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof SOCKET_TYPE;
    socket.type = SOCKET_TYPE[typedString];
  }

  public setStatus(event: MatSelectChange, socket: any): void {
    let typedString = event.value as keyof typeof SOCKET_STATUS;
    socket.status = SOCKET_STATUS[typedString];
  }
  public onSave(): void {
    console.log('save')
  }
  //#endregion

}
