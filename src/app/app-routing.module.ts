import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BolnicaComponent } from './main/bolnica/bolnica.component';
import { PacijentComponent } from './main/pacijent/pacijent.component';
import { DijagnozaComponent } from './main/dijagnoza/dijagnoza.component';
import { OdeljenjeComponent } from './main/odeljenje/odeljenje.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bolnica', component: BolnicaComponent },
  { path: 'pacijent', component: PacijentComponent },
  { path: 'dijagnoza', component: DijagnozaComponent },
  { path: 'odeljenje', component: OdeljenjeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
