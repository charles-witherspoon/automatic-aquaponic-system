import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GrowthDataService } from '../growth-data/growth-data.service';

@Component({
  selector: 'app-delete-plant-dialog',
  templateUrl: './delete-plant-dialog.component.html',
  styleUrls: ['./delete-plant-dialog.component.scss']
})
export class DeletePlantDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private plantService: GrowthDataService) { }

  ngOnInit(): void {
  }

  public deletePlant(): void {
    if (this.data.id) {
      this.plantService.deletePlant(this.data.id);
    }
  }
}
