import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Komponente
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ArtiklComponent } from './main/artikl/artikl.component';

import { BolnicaComponent } from './main/bolnica/bolnica.component';
import { BolnicaDialogComponent } from './dialogs/bolnica-dialog/bolnica-dialog.component';

import { DijagnozaComponent } from './main/dijagnoza/dijagnoza.component';
import { DijagnozaDialogComponent } from './dialogs/dijagnoza-dialog/dijagnoza-dialog.component';

import { OdeljenjeComponent } from './main/odeljenje/odeljenje.component';
import { OdeljenjeDialogComponent } from './dialogs/odeljenje-dialog/odeljenje-dialog.component';

import { PacijentComponent } from './main/pacijent/pacijent.component';
import { PacijentDialogComponent } from './dialogs/pacijent-dialog/pacijent-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtiklComponent,
    BolnicaComponent,
    BolnicaDialogComponent,
    DijagnozaComponent,
    DijagnozaDialogComponent,
    OdeljenjeComponent,
    OdeljenjeDialogComponent,
    PacijentComponent,
    PacijentDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    AppRoutingModule,

    // Angular Material
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
