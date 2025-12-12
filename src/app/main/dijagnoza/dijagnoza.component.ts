import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Dijagnoza } from '../../dijagnoza.model';
import { DijagnozaDialogComponent } from '../../dialogs/dijagnoza-dialog/dijagnoza-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component'; // ⬅⬅⬅ DODATO

@Component({
  selector: 'app-dijagnoza',
  templateUrl: './dijagnoza.component.html',
  styleUrls: ['./dijagnoza.component.css']
})
export class DijagnozaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource = new MatTableDataSource<Dijagnoza>([]);

  searchValue: string = '';

  private apiUrl = 'http://localhost:8082/dijagnoza';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  
    this.dataSource.filterPredicate = (data: Dijagnoza, filter: string): boolean => {
      const term = filter.trim().toLowerCase();

      return (
        Boolean(data.naziv?.toLowerCase().includes(term)) ||
        Boolean(data.opis?.toLowerCase().includes(term)) ||
        Boolean(data.oznaka?.toLowerCase().includes(term))
      );
    };

    this.ucitajDijagnoze();
  }

  ucitajDijagnoze(): void {
    this.http.get<Dijagnoza[]>(this.apiUrl).subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Greška pri učitavanju dijagnoza', err)
    });
  }

  applyFilter(value: string): void {
    this.searchValue = value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  clearFilter(): void {
    this.searchValue = '';
    this.dataSource.filter = '';
  }

  obrisiDijagnozu(id: number | undefined): void {
    if (id === undefined) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Brisanje dijagnoze',
        message: 'Da li sigurno želiš da obrišeš ovu dijagnozu?'
      }
    });

    dialogRef.afterClosed().subscribe((potvrdio: boolean) => {
      if (!potvrdio) {
        return;
      }

      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.ucitajDijagnoze(),
        error: (err) => {
          console.error(
            'Greška pri brisanju dijagnoze, dijagnoza je vezana za postojećeg pacijenta',
            err
          );

          this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              title: 'Greška',
              message: 'Greška pri brisanju dijagnoze, dijagnoza je vezana za postojećeg pacijenta.'
            }
          });
        }
      });
    });
  }

  dodajDijagnozu(): void {
    const dialogRef = this.dialog.open(DijagnozaDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Dijagnoza | undefined) => {
      if (!result) return;

      this.http.post(this.apiUrl, result).subscribe({
        next: () => this.ucitajDijagnoze(),
        error: (err) => {
          console.error('Greška pri dodavanju dijagnoze', err);
          alert('Greška pri dodavanju dijagnoze');
        }
      });
    });
  }

  izmeniDijagnozu(d: Dijagnoza): void {
    const dialogRef = this.dialog.open(DijagnozaDialogComponent, {
      width: '400px',
      data: { ...d }
    });

    dialogRef.afterClosed().subscribe((result: Dijagnoza | undefined) => {
      if (!result || d.id == null) return;

      this.http.put(`${this.apiUrl}/${d.id}`, result).subscribe({
        next: () => {
          const data = [...this.dataSource.data];
          const index = data.findIndex(x => x.id === d.id);
          if (index !== -1) {
            data[index] = { ...data[index], ...result };
            this.dataSource.data = data;
          }
        },
        error: (err) => {
          console.error('Greška pri izmeni dijagnoze', err);
          alert('Greška pri izmeni dijagnoze');
        }
      });
    });
  }
}
