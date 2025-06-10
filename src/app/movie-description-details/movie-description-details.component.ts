import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-description-details',
  templateUrl: './movie-description-details.component.html',
  styleUrl: './movie-description-details.component.scss'
})
export class MovieDescriptionDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MovieDescriptionDetailsComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
