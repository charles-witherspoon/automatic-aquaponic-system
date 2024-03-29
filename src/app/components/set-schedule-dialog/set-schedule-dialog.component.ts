import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketService } from '../sockets/socket.service';

@Component({
  selector: 'app-set-schedule-dialog',
  templateUrl: './set-schedule-dialog.component.html',
  styleUrls: ['./set-schedule-dialog.component.scss']
})
export class SetScheduleDialogComponent implements OnInit {

  public sunControl: FormControl = new FormControl();
  public monControl: FormControl = new FormControl();
  public tueControl: FormControl = new FormControl();
  public wedControl: FormControl = new FormControl();
  public thuControl: FormControl = new FormControl();
  public friControl: FormControl = new FormControl();
  public satControl: FormControl = new FormControl();

  public scheduleForm: FormGroup = new FormGroup({

  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private socketService: SocketService) {
    this.scheduleForm = this.fb.group({
      days: this.fb.group({
        sun: this.sunControl,
        mon: this.monControl,
        tue: this.tueControl,
        wed: this.wedControl,
        thu: this.thuControl,
        fri: this.friControl,
        sat: this.satControl,
      }),
      ranges: this.fb.array([
        this.newRange()
      ])
    });

  }

  ngOnInit(): void {
  }

  public days(): FormArray {
    return this.scheduleForm.get('days') as FormArray;
  }

  public ranges(): FormArray {
    return this.scheduleForm.get('ranges') as FormArray;
  }

  public newRange(): FormGroup {
    return this.fb.group({
      start: '',
      end: ''
    })
  }

  public addRange(): void {
    this.ranges().push(this.newRange());
  }

  public removeRange(i: number): void {
    this.ranges().removeAt(i);
  }

  /**
   * Sets the schedules for when the socket will be turned off; 
   * each range will have a cron job for 'start' (when to power off) 
   * and 'end' (when to power back on)
   */
  public setSchedule() {
    if (!this.data.id) {
      return;
    }

    this.socketService.clearSchedules(this.data.id);

    const dayString: string = this.getDayString();

    let cronAndStatus: [string, number][] = [];
    this.ranges().controls.forEach(control => {
      let start: string = control.value['start'];
      let end: string = control.value['end'];

      cronAndStatus.push([this.getCronString(dayString, start), 0]);
      cronAndStatus.push([this.getCronString(dayString, end), 1]);
    })

    cronAndStatus.forEach(cronStatus => {
      this.socketService.addSchedule(cronStatus[0], this.data.id, cronStatus[1]);
    })

  }

  private getDayString(): string {

    let strings: string[] = [];

    let days: any = this.days().controls;
    Object.keys(days).forEach(day => {
      if (days[day].value) {
        strings.push(day.toUpperCase());
      }
    });

    return strings.join(',');
  }


  private getCronString(dayString: string, timeString: string): string {
    const timeStringParts: string[] = timeString.split(':');
    const hour: number = Number(timeStringParts[0]);
    const minute: number = Number(timeStringParts[1]);
    const day: string = dayString ? dayString : '*';

    const cronString: string = `${minute} ${hour} * * ${day}`;

    return cronString;
  }
}
