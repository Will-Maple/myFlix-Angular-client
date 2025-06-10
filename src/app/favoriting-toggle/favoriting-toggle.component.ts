import { Component, Inject, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { ProvideUsernameService } from '../provide-username.service';
import { FavoritingLocalService } from '../favoriting-local.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-favoriting-toggle',
  templateUrl: './favoriting-toggle.component.html',
  styleUrl: './favoriting-toggle.component.scss'
})
export class FavoritingToggleComponent {
  username: string = '';
  favorites: string[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FavoritingToggleComponent>, public fetchApiData: FetchApiDataService, public provideUsername: ProvideUsernameService, public favoritingLocalService: FavoritingLocalService) { }

  close(): void {
    this.dialogRef.close();
  }

  addFavorite(): void {
    this.username = this.provideUsername.provideUsername();
    this.fetchApiData.getAddFav(this.username, this.data.movie._id).subscribe({
      next: (response) => {
        this.favoritingLocalService.addFavorite(this.data.movie._id)
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteFavorite(): void {
    this.username = this.provideUsername.provideUsername();
    this.fetchApiData.getDeleteFav(this.username, this.data.movie._id).subscribe({
      next: (response) => {
        this.favoritingLocalService.deleteFavorite(this.data.movie._id)
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
