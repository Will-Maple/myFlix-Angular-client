import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IsPlatformBrowserService } from './is-platform-browser.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public isPlatformBrowser: IsPlatformBrowserService) { }

  /**
   * Returns to /welcome page if there is no logged in user
   * @param route 
   * @param state 
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isPlatformBrowser.test()) {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      }
      this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
      return false;
    } else {
      return false;
    }
  }
}