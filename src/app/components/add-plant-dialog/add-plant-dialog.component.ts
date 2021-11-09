import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plant } from 'src/app/models/plants';
import { GrowthDataService } from '../growth-data/growth-data.service';

@Component({
  selector: 'app-add-plant-dialog',
  templateUrl: './add-plant-dialog.component.html',
  styleUrls: ['./add-plant-dialog.component.scss']
})
export class AddPlantDialogComponent implements OnInit {

  nameControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  plantForm: FormGroup = new FormGroup({
    name: this.nameControl
  });

  constructor(private plantService: GrowthDataService) { }

  ngOnInit(): void {
  }

  public addPlant(): void {
    if (this.plantForm.valid) {
      this.plantService.addPlant(this.nameControl.value);
    }
  }
}
