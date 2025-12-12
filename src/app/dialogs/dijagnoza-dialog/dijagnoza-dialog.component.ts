import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dijagnoza } from '../../dijagnoza.model';

@Component({
  selector: 'app-dijagnoza-dialog',
  templateUrl: './dijagnoza-dialog.component.html',
  styleUrls: ['./dijagnoza-dialog.component.css']
})
export class DijagnozaDialogComponent {

  dijagnoza: Dijagnoza;

  constructor(
    public dialogRef: MatDialogRef<DijagnozaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dijagnoza | null
  ) {
    if (data) {
      // edit
      this.dijagnoza = { ...data };
    } else {
      // novi
      this.dijagnoza = {
        naziv: '',
        opis: '',
        oznaka: ''
      };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.dijagnoza);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
