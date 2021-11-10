import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketService } from '../sockets/socket.service';

@Component({
  selector: 'app-delete-socket-type-dialog',
  templateUrl: './delete-socket-type-dialog.component.html',
  styleUrls: ['./delete-socket-type-dialog.component.scss']
})
export class DeleteSocketTypeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private socketService: SocketService) { }

  ngOnInit(): void {
  }

  public deleteType(): void {
    if (this.data.type) {
      this.socketService.deleteSocketType(this.data.type);
    }
  }
}
