import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { ProvideUsernameService } from '../provide-username.service';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent {
  username: string = this.provideUsername.provideUsername();

  constructor(public fetchApiData: FetchApiDataService, private router: Router, public provideUsername: ProvideUsernameService, public dialogRef: MatDialogRef<UserDeleteComponent>) { }

  close(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.username).subscribe((resp: any) => {
      console.log("Bye Friend");
      localStorage.clear();
      this.router.navigate(['/welcome']);
    })
  }
}
