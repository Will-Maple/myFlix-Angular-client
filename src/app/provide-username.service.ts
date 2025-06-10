import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

/* This should only be run when wrapped in a condition that checks thru the service that 'isPlatformBrowser.test()' is true
  unless it is being called by a user input */
export class ProvideUsernameService {
  username: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  provideUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('username') || '';
      return this.username;
    } else {
      return '';
    }
  }
}