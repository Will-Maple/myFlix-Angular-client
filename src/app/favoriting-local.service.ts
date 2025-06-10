import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritingLocalService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  setFavorites(favs: string[]) {
    this.favoritesSubject.next(favs);
  }

  addFavorite(movieId: string) {
    const current = this.favoritesSubject.value;
    if (!current.includes(movieId)) {
      this.favoritesSubject.next([...current, movieId]);
    }
  }

  deleteFavorite(movieId: string) {
    const current = this.favoritesSubject.value;
    this.favoritesSubject.next(current.filter(id => id !== movieId));
  }

  isFavorite(movieId: string): boolean {
    return this.favoritesSubject.value.includes(movieId);
  }
}