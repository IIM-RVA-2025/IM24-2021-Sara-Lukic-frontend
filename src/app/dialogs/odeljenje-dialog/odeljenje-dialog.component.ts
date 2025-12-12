import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Odeljenje } from '../../odeljenje.model';
import { Bolnica } from '../../bolnica.model';

export interface OdeljenjeDialogData {
  odeljenje: Odeljenje | null;
  bolnice: Bolnica[];
}

@Component({
  selector: 'app-odeljenje-dialog',
  templateUrl: './odeljenje-dialog.component.html',
  styleUrls: ['./odeljenje-dialog.component.css']
})
export class OdeljenjeDialogComponent {

  odeljenje: Odeljenje;

  constructor(
    public dialogRef: MatDialogRef<OdeljenjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OdeljenjeDialogData
  ) {
    if (data.odeljenje) {
      this.odeljenje = { ...data.odeljenje };
    } else {
      this.odeljenje = {
        naziv: '',
        lokacija: '',
        bolnica: data.bolnice[0] ?? {} as Bolnica
      };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.odeljenje);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
