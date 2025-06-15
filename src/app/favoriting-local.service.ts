import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritingLocalService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  /**
   * Sets the favoritesSubject Observable to the param.
   * @param {array} favs array of strings (movieIDs)
   */
  setFavorites(favs: string[]) {
    this.favoritesSubject.next(favs);
  }

  /**
   * Adds a movieId to favoritesSubject
   * @param {string} movieId 
   */
  addFavorite(movieId: string) {
    const current = this.favoritesSubject.value;
    if (!current.includes(movieId)) {
      this.favoritesSubject.next([...current, movieId]);
    }
  }

  /**
   * Removes a movieID from the favoritesSubject
   * @param {string} movieId
   */
  deleteFavorite(movieId: string) {
    const current = this.favoritesSubject.value;
    this.favoritesSubject.next(current.filter(id => id !== movieId));
  }

  /**
   * Checks if a movieId is included in the favoritesSubject
   * @param movieId 
   * @returns {boolean}
   */
  isFavorite(movieId: string): boolean {
    return this.favoritesSubject.value.includes(movieId);
  }
}