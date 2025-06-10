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
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
          this.cols = 1;
        } else if (this.breakpointObserver.isMatched(Breakpoints.TabletPortrait)) {
          this.cols = 2;
        } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getYoutubeThumb(url: string): string {
    const match = url.match(/embed\/([\w-]+)/);
    const videoId = match ? match[1] : '';
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  getUser(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  openDirectorDetailsComponent(director: any): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: { director },
      width: '280px'
    });
  }
  openGenreDetailsComponent(genre: any): void {
    this.dialog.open(GenreDetailsComponent, {
      data: { genre },
      width: '280px'
    });
  }
  openMovieDescriptionDetailsComponent(movie: any): void {
    this.dialog.open(MovieDescriptionDetailsComponent, {
      data: { movie },
      width: '280px'
    });
  }
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
