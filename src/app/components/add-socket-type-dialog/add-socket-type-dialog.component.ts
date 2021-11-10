import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../sockets/socket.service';

@Component({
  selector: 'app-add-socket-type-dialog',
  templateUrl: './add-socket-type-dialog.component.html',
  styleUrls: ['./add-socket-type-dialog.component.scss']
})
export class AddSocketTypeDialogComponent implements OnInit {

  typeControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);

  public typeForm: FormGroup = new FormGroup({
    type: this.typeControl
  });

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }

  public addType(): void {
    if (this.typeForm.valid) {
      this.socketService.addSocketType(this.typeControl.value);
    }
  }

}
