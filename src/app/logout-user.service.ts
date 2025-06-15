import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class LogoutUserService {

  constructor(private router: Router) { }

  /**
   * clears local storage, navigates to /welcome route
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}