import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Bolnica } from '../../bolnica.model';
import { BolnicaDialogComponent } from 'src/app/dialogs/bolnica-dialog/bolnica-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-bolnica',
  templateUrl: './bolnica.component.html',
  styleUrls: ['./bolnica.component.css']
})
export class BolnicaComponent implements OnInit {

  // koje kolone tabela prikazuje
  displayedColumns: string[] = ['id', 'naziv', 'adresa', 'budzet', 'actions'];

  dataSource = new MatTableDataSource<Bolnica>([]);

  private apiUrl = 'http://localhost:8082/bolnica';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ucitajBolnice();
  }

  ucitajBolnice(): void {
    this.http.get<Bolnica[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Greška pri učitavanju bolnica', err);
      }
    });
  }

  obrisiBolnicu(id: number | undefined): void {
  if (id === undefined) return;

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '380px',
    data: {
      title: 'Brisanje bolnice',
      message: 'Da li sigurno želiš da obrišeš ovu bolnicu?'
    }
  });

  dialogRef.afterClosed().subscribe((potvrdio: boolean) => {
    if (!potvrdio) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.ucitajBolnice(),
      error: (err) => {
        console.error('Greška pri brisanju bolnice', err);

        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Greška',
            message: 'Greška pri brisanju bolnice.'
          }
        });
      }
    });
  });
}

  dodajBolnicu(): void {
    const dialogRef = this.dialog.open(BolnicaDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Bolnica | undefined) => {
      if (result) {
        this.http.post(this.apiUrl, result).subscribe({
          next: () => this.ucitajBolnice(),
          error: (err) => {
            console.error('Greška pri dodavanju bolnice', err);
            alert('Greška pri dodavanju bolnice');
          }
        });
      }
    });
  }

  izmeniBolnicu(bolnica: Bolnica): void {
    const dialogRef = this.dialog.open(BolnicaDialogComponent, {
      width: '400px',
      data: { ...bolnica } 
    });

    dialogRef.afterClosed().subscribe((result: Bolnica | undefined) => {
      if (result) {

        this.http.put(`${this.apiUrl}/${bolnica.id}`, result).subscribe({
          next: () => this.ucitajBolnice(),
          error: (err) => {
            console.error('Greška pri izmeni bolnice', err);
            alert('Greška pri izmeni bolnice');
          }
        });
      }
    });
  }
}
