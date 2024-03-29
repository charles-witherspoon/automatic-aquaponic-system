import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';





const Material = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatTableModule,
  MatSliderModule,
]

@NgModule({
  declarations: [],
  exports: [Material]
})
export class MaterialModule { }
