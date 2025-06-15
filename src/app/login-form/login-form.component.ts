import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { FavoritingLocalService } from '../favoriting-local.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loading: boolean = false;
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private favoritingLocalService: FavoritingLocalService
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  /**
   * Sends login input to login api method, if sucessful sets jwt token and username to local storge, sets favorites observable thru favoritinglocalservice, and redirects to /movies page.
   */
  loginUser(): void {
    this.loading = true;
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result: any) => {
        this.loading = false;
        this.close();
        this.snackBar.open(`Welcome ${this.loginData.Username}`, 'Ok', {
          duration: 2000,
        });
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', this.loginData.Username);
        this.favoritingLocalService.setFavorites(result.user.Favorites)
        this.router.navigate(['/movies']);
      },
      (result) => {
        this.loading = false;
        const message = result?.error?.message || 'Username or Password incorrect'
        this.snackBar.open(message, 'Ok', {
          duration: 2000,
        });
      }
    );
  }
}
