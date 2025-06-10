import { Component, Input, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { FetchApiDataService } from '../fetch-api-data.service';
import { ProvideUsernameService } from '../provide-username.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  username: string = '';
  @Input() userEditData = { Username: this.data.user.Username, Password: '', Email: this.data.user.Email, Birthday: this.data.birthday };

  constructor(public fetchApiData: FetchApiDataService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UserEditComponent>, public provideUsername: ProvideUsernameService) { }

  close(): void {
    this.dialogRef.close();
  }

  editUser(): void {
    this.username = this.provideUsername.provideUsername();
    this.fetchApiData.editUser(this.username, this.userEditData)
      .pipe(
        finalize(() => {
          console.log(this.userEditData);
        })
      ).subscribe({
        next: (response: any) => {
          localStorage.setItem('username', this.userEditData.Username);
          this.router.navigate(['/movies']);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
