import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { FetchApiDataService } from '../fetch-api-data.service';
import { ProvideUsernameService } from '../provide-username.service';
import { IsPlatformBrowserService } from '../is-platform-browser.service';
import { FavoritingLocalService } from '../favoriting-local.service';

import { MatDialog } from "@angular/material/dialog";

import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { MovieDescriptionDetailsComponent } from '../movie-description-details/movie-description-details.component';
import { FavoritingToggleComponent } from '../favoriting-toggle/favoriting-toggle.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  username: string = '';
  favorites: string[] = [];
  cols = 3;

  constructor(private breakpointObserver: BreakpointObserver, public fetchApiData: FetchApiDataService, public dialog: MatDialog, public provideUsername: ProvideUsernameService, public isPlatformBrowser: IsPlatformBrowserService, public favoritingLocalService: FavoritingLocalService) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else {
          this.cols = 3;
        }
      }
    });
  }

  ngOnInit(): void {
    this.favoritingLocalService.favorites$.subscribe(favs => {
      this.favorites = favs;
    });
    if (this.isPlatformBrowser.test()) {
      this.username = this.provideUsername.provideUsername();
      if (this.username) {
        this.getUser();
        this.getMovies();
      } else {
        console.error('No username found in localStorage');
      }
    }
  }

  /**
   * Fetches all movies from api
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
  * Changes a movie.URL into a thumbnail url
  * @param {string} url 
  * @returns {string} 
  */
  getYoutubeThumb(url: string): string {
    const match = url.match(/embed\/([\w-]+)/);
    const videoId = match ? match[1] : '';
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  /**
  * Fetches user from api based on this.username
  * @returns {array} user with with Username, Password, Email, Birthdate, Favorites
  */
  getUser(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }

  /**
  * Opens DirectorDetailsComponent as dialog, passes movie.Director to dialog data
  * @param {array} director with Name
  */
  openDirectorDetailsComponent(director: any): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: { director },
      width: '280px'
    });
  }

  /**
  * Opens GenreDetailsComponent as dialog, passes movie.Genre to dialog data
  * @param {array} Genre with Name and Description
  */
  openGenreDetailsComponent(genre: any): void {
    this.dialog.open(GenreDetailsComponent, {
      data: { genre },
      width: '280px'
    });
  }

  /**
  * Opens MovieDescriptionDetailsComponent as dialog, passes movie to dialog data
  * @param {array} Movie with Title, Year, Director with Name, URL, Subs with Spanish and SpanishURL, and Genre with Name and Description
  */
  openMovieDescriptionDetailsComponent(movie: any): void {
    this.dialog.open(MovieDescriptionDetailsComponent, {
      data: { movie },
      width: '280px'
    });
  }

  /**
  * Opens FavoritingToggleComponent as dialog, passes movie and it's youtube thumbnail url to dialog data
  * @param {array} Movie with Title, Year, Director with Name, URL, Subs with Spanish and SpanishURL, and Genre with Name and Description
  */
  openFavoritingToggleComponent(movie: any): void {
    const imageUrl = this.getYoutubeThumb(movie.URL)
    this.dialog.open(FavoritingToggleComponent, {
      data: {
        movie: movie,
        imageUrl: imageUrl,
      },
    });
  }
}
