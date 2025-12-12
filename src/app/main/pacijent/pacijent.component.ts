import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Pacijent } from '../../pacijent.model';
import { Odeljenje } from '../../odeljenje.model';
import { Dijagnoza } from '../../dijagnoza.model';
import { PacijentDialogComponent } from '../../dialogs/pacijent-dialog/pacijent-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'ime',
    'prezime',
    'zdrOsiguranje',
    'datumRodjenja',
    'odeljenje',
    'dijagnoza',
    'actions'
  ];

  dataSource = new MatTableDataSource<Pacijent>([]);

  private apiPacijent = 'http://localhost:8082/pacijent';
  private apiOdeljenje = 'http://localhost:8082/odeljenje';
  private apiDijagnoza = 'http://localhost:8082/dijagnoza';

  odeljenja: Odeljenje[] = [];
  dijagnoze: Dijagnoza[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajOdeljenja();
    this.ucitajDijagnoze();
    this.ucitajPacijente();
  }

  ucitajPacijente(): void {
    this.http.get<Pacijent[]>(this.apiPacijent).subscribe({
      next: (data) => {
        console.log('Pacijenti sa backenda:', data);
        this.dataSource.data = data;
      },
      error: (err) => console.error('Greška pri učitavanju pacijenata', err)
    });
  }

  ucitajOdeljenja(): void {
    this.http.get<Odeljenje[]>(this.apiOdeljenje).subscribe({
      next: (data) => this.odeljenja = data,
      error: (err) => console.error('Greška pri učitavanju odeljenja', err)
    });
  }

  ucitajDijagnoze(): void {
    this.http.get<Dijagnoza[]>(this.apiDijagnoza).subscribe({
      next: (data) => this.dijagnoze = data,
      error: (err) => console.error('Greška pri učitavanju dijagnoza', err)
    });
  }

 obrisiPacijenta(id: number | undefined): void {
  if (id === undefined) return;

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '380px',
    data: {
      title: 'Brisanje pacijenta',
      message: 'Da li sigurno želiš da obrišeš ovog pacijenta?'
    }
  });

  dialogRef.afterClosed().subscribe((potvrdio: boolean) => {
    if (!potvrdio) return;

    this.http.delete(`${this.apiPacijent}/${id}`).subscribe({
      next: () => this.ucitajPacijente(),
      error: (err) => {
        console.error('Greška pri brisanju pacijenta', err);

        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Greška',
            message: 'Greška pri brisanju pacijenta.'
          }
        });
      }
    });
  });
}

  dodajPacijenta(): void {
    const dialogRef = this.dialog.open(PacijentDialogComponent, {
      width: '500px',
      data: {
        pacijent: null,
        odeljenja: this.odeljenja,
        dijagnoze: this.dijagnoze
      }
    });

    dialogRef.afterClosed().subscribe((result: Pacijent | undefined) => {
      if (!result) return;

      this.http.post(this.apiPacijent, result).subscribe({
        next: () => this.ucitajPacijente(),
        error: (err) => {
          console.error('Greška pri dodavanju pacijenta', err);
          alert('Greška pri dodavanju pacijenta');
        }
      });
    });
  }

  izmeniPacijenta(p: Pacijent): void {
    const dialogRef = this.dialog.open(PacijentDialogComponent, {
      width: '500px',
      data: {
        pacijent: { ...p },
        odeljenja: this.odeljenja,
        dijagnoze: this.dijagnoze
      }
    });

    dialogRef.afterClosed().subscribe((result: Pacijent | undefined) => {
      if (!result || p.id == null) return;

      this.http.put(`${this.apiPacijent}/${p.id}`, result).subscribe({
        next: () => {
          const data = [...this.dataSource.data];
          const index = data.findIndex(x => x.id === p.id);
          if (index !== -1) {
            data[index] = { ...data[index], ...result };
            this.dataSource.data = data;
          }
        },
        error: (err) => {
          console.error('Greška pri izmeni pacijenta', err);
          alert('Greška pri izmeni pacijenta');
        }
      });
    });
  }
}
