import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


const Material = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule
]

@NgModule({
  declarations: [],
  exports: [Material]
})
export class MaterialModule { }
