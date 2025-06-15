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

  /**
   * Uses this.data.movie._id from matDialogData and username from local storage thru provide username storage...
   * to add a favorite to a user's list of favorites thru the api and then when sucessful to the favorites observable.
   */
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

  /**
 * Uses this.data.movie._id from matDialogData and username from local storage thru provide username storage...
 * to remove a favorite from a user's list of favorites thru the api and then when sucessful from the favorites observable.
 */
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
