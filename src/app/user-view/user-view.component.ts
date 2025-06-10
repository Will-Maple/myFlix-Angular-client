import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service'
import { LogoutUserService } from '../logout-user.service';
import { ProvideUsernameService } from '../provide-username.service';
import { IsPlatformBrowserService } from '../is-platform-browser.service';

import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
  user: any = {};
  username: string = '';
  image: string = '/assets/img/user.png'

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public logoutUser: LogoutUserService, public provideUsername: ProvideUsernameService, public isPlatformBrowser: IsPlatformBrowserService) { }

  ngOnInit(): void {
    if (this.isPlatformBrowser.test()) {
      this.username = this.provideUsername.provideUsername();
      if (this.username) {
        this.getUser();
      } else {
        console.error('No username found in localStorage');
      }
    }
  }

  getUser(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.user = resp;
      /*if (this.user.Favorites) {
        this.fetchApiData.getMovie(this.user.Favorites[0]).subscribe((resp: any) => {
          this.image = resp.URL;
        })
      } else {
        return this.user
      }*/
      return this.user/*, this.image*/;
    });
  }

  formatDate(): string {
    if (!this.user.Birthday) { return '' };
    const date = new Date(this.user.Birthday);
    return date.toISOString().split('T')[0];
  }

  openEditUserDialog(user: any, birthday: string): void {
    this.dialog.open(UserEditComponent, {
      data: { user, birthday },
      width: '280px'
    });
  }
  openDeleteUserDialog(): void {
    this.dialog.open(UserDeleteComponent, {
      width: '280px'
    });
  }
}
