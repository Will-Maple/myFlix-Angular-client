import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IsPlatformBrowserService } from './is-platform-browser.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirect implements CanActivate {
  constructor(
    private router: Router,
    public isPlatformBrowser: IsPlatformBrowserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.isPlatformBrowser.test()) {
      return false;
    }

    const token = localStorage.getItem('token');
    if (token) {
      return this.router.parseUrl('/movies')
    }

    return true;
  }
}
