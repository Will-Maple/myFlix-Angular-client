import { Component } from '@angular/core';
import { LogoutUserService } from '../logout-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-menu',
  templateUrl: './mat-menu.component.html',
  styleUrl: './mat-menu.component.scss'
})
export class MatMenuComponent {

  constructor(public logoutUser: LogoutUserService, private router: Router) { }

  moviesRoute(): void {
    this.router.navigate(['/movies']);
  }

  userRoute(): void {
    this.router.navigate(['/user']);
  }

}
