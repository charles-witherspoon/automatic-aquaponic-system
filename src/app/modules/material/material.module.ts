import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';





const Material = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
]

@NgModule({
  declarations: [],
  exports: [Material]
})
export class MaterialModule { }
