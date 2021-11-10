import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SocketsComponent } from './components/sockets/sockets.component';
import { GrowthDataComponent } from './components/growth-data/growth-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPlantDialogComponent } from './components/add-plant-dialog/add-plant-dialog.component';
import { DeletePlantDialogComponent } from './components/delete-plant-dialog/delete-plant-dialog.component';
import { AddSocketTypeDialogComponent } from './components/add-socket-type-dialog/add-socket-type-dialog.component';
import { DeleteSocketTypeDialogComponent } from './components/delete-socket-type-dialog/delete-socket-type-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SocketsComponent,
    GrowthDataComponent,
    AddPlantDialogComponent,
    DeletePlantDialogComponent,
    AddSocketTypeDialogComponent,
    DeleteSocketTypeDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
