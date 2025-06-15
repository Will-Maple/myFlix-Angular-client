import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root',
})

export class IsPlatformBrowserService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * Checks if running on client side (true) or not (false)
   * @returns {boolean}
   */
  test(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}