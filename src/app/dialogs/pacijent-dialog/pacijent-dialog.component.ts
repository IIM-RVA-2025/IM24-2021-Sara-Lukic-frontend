import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacijent } from '../../pacijent.model';
import { Odeljenje } from '../../odeljenje.model';
import { Dijagnoza } from '../../dijagnoza.model';

export interface PacijentDialogData {
  pacijent: Pacijent | null;
  odeljenja: Odeljenje[];
  dijagnoze: Dijagnoza[];
}

@Component({
  selector: 'app-pacijent-dialog',
  templateUrl: './pacijent-dialog.component.html',
  styleUrls: ['./pacijent-dialog.component.css']
})
export class PacijentDialogComponent {

  pacijent: Pacijent;

  constructor(
    public dialogRef: MatDialogRef<PacijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PacijentDialogData
  ) {
    if (data.pacijent) {
      this.pacijent = { ...data.pacijent };
    } else {
      this.pacijent = {
        ime: '',
        prezime: '',
        zdrOsiguranje: false,
        datumRodjenja: '',
        odeljenje: data.odeljenja[0] ?? {} as Odeljenje,
        dijagnoza: data.dijagnoze[0] ?? {} as Dijagnoza
      };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.pacijent);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
