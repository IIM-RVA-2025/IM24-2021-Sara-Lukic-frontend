import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bolnica-dialog',
  templateUrl: './bolnica-dialog.component.html',
  styleUrls: ['./bolnica-dialog.component.css']
})
export class BolnicaDialogComponent {

  bolnica: any = {};
  naslov: string = 'Nova bolnica';

  constructor(
    private dialogRef: MatDialogRef<BolnicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.bolnica = { ...data };
      this.naslov = 'Izmeni bolnicu';
    }
  }

  sacuvaj() {
    this.dialogRef.close(this.bolnica);
  }

  zatvori() {
    this.dialogRef.close(null);
  }
}
