import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Odeljenje } from '../../odeljenje.model';
import { Bolnica } from '../../bolnica.model';
import { OdeljenjeDialogComponent } from '../../dialogs/odeljenje-dialog/odeljenje-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-odeljenje',
  templateUrl: './odeljenje.component.html',
  styleUrls: ['./odeljenje.component.css']
})
export class OdeljenjeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'naziv', 'lokacija', 'bolnica', 'actions'];
  dataSource = new MatTableDataSource<Odeljenje>([]);

  private apiOdeljenje = 'http://localhost:8082/odeljenje';
  private apiBolnica = 'http://localhost:8082/bolnica';

  bolnice: Bolnica[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ucitajBolnice();
    this.ucitajOdeljenja();
  }

  ucitajBolnice(): void {
    this.http.get<Bolnica[]>(this.apiBolnica).subscribe({
      next: (data) => this.bolnice = data,
      error: (err) => console.error('Greška pri učitavanju bolnica', err)
    });
  }

  ucitajOdeljenja(): void {
    this.http.get<Odeljenje[]>(this.apiOdeljenje).subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Greška pri učitavanju odeljenja', err)
    });
  }

  obrisiOdeljenje(id: number | undefined): void {
  if (id === undefined) return;

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '380px',
    data: {
      title: 'Brisanje odeljenja',
      message: 'Da li sigurno želiš da obrišeš ovo odeljenje?'
    }
  });

  dialogRef.afterClosed().subscribe((potvrdio: boolean) => {
    if (!potvrdio) return;

    this.http.delete(`${this.apiOdeljenje}/${id}`).subscribe({
      next: () => this.ucitajOdeljenja(),
      error: (err) => {
        console.error(
          'Greška pri brisanju odeljenja, odeljenje je možda vezano za postojeće pacijente',
          err
        );

        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Greška',
            message: 'Greška pri brisanju odeljenja. Verovatno je vezano za postojeće pacijente.'
          }
        });
      }
    });
  });
}


  dodajOdeljenje(): void {
    const dialogRef = this.dialog.open(OdeljenjeDialogComponent, {
      width: '450px',
      data: {
        odeljenje: null,
        bolnice: this.bolnice
      }
    });

    dialogRef.afterClosed().subscribe((result: Odeljenje | undefined) => {
      if (!result) return;

      this.http.post(this.apiOdeljenje, result).subscribe({
        next: () => this.ucitajOdeljenja(),
        error: (err) => {
          console.error('Greška pri dodavanju odeljenja', err);
          alert('Greška pri dodavanju odeljenja');
        }
      });
    });
  }

  izmeniOdeljenje(o: Odeljenje): void {
    const dialogRef = this.dialog.open(OdeljenjeDialogComponent, {
      width: '450px',
      data: {
        odeljenje: { ...o },
        bolnice: this.bolnice
      }
    });

    dialogRef.afterClosed().subscribe((result: Odeljenje | undefined) => {
      if (!result || o.id == null) return;

      this.http.put(`${this.apiOdeljenje}/${o.id}`, result).subscribe({
        next: () => {
          const data = [...this.dataSource.data];
          const index = data.findIndex(x => x.id === o.id);
          if (index !== -1) {
            data[index] = { ...data[index], ...result };
            this.dataSource.data = data;
          }
        },
        error: (err) => {
          console.error('Greška pri izmeni odeljenja', err);
          alert('Greška pri izmeni odeljenja');
        }
      });
    });
  }
}
