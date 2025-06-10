import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { LoginRedirect } from './login.redirect';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list'



import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { DirectorDetailsComponent } from './director-details/director-details.component';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { MovieDescriptionDetailsComponent } from './movie-description-details/movie-description-details.component';
import { FavoritingToggleComponent } from './favoriting-toggle/favoriting-toggle.component';
import { MatMenuComponent } from './mat-menu/mat-menu.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent, canActivate: [LoginRedirect] },
  { path: 'movies', component: MovieCardComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [AppComponent, UserRegistrationFormComponent, LoginFormComponent, MovieCardComponent, WelcomePageComponent, UserViewComponent, UserEditComponent, UserDeleteComponent, DirectorDetailsComponent, GenreDetailsComponent, MovieDescriptionDetailsComponent, FavoritingToggleComponent, MatMenuComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch()), provideAnimationsAsync(), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
