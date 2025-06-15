import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http2ServerRequest } from 'http2';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mosfilm-api.onrender.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
* Login user
* @param {string} Username must be 5 characters or more and alphanumeric
* @param {string} Password must be 9 characters or more
* @returns {Observable} An object which contains a user array with Username, Password, Email, Birthdate, Favorites and a token for jwt auth 
*/
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
  * Returns all of a user's details
  * @param { string } Username must be 5 characters or more and alphanumeric
  * @returns { Observable } An array which contains a user with Username, Password, Email, Birthdate, Favorites
  */
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${username}`)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * Register user
  * @param {string} Username must be 5 characters or more and alphanumeric
  * @param {string} Password must be 9 characters or more
  * @param {string} Email must be an email
  * @param {date} Birthday must be in yyyy-mm-dd format
  * @returns {Observable} Contains an array... user with Username, Password, Email, Birthdate, Favorites
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
* Update/edit user
* @param {string} Username must be 5 characters or more and alphanumeric
* @param {string} Password must be 9 characters or more
* @param {string} Email must be an email
* @param {date} Birthday must be in yyyy-mm-dd format
* @returns {Observable} Contains an array... user with Username, Password, Email, Birthdate, Favorites
*/
  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
* Delete user
* @param {string} Username must be 5 characters or more and alphanumeric
* @returns {Observable} A string with a confirmation message
*/
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}`)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get all movies
   *  @returns {Observable} containing an array of all movies with Title, Year, Director with Name, URL, Subs with Spanish and SpanishURL, and Genre with Name and Description
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies')
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * Get movie by title
  *  @param {string} Title
  *  @returns {Observable} containing a movie array with Title, Year, Director with Name, URL, Subs with Spanish and SpanishURL, and Genre with Name and Description
  */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * Get genre by name
  *  @param {string} Name
  *  @returns {Observable} containing a Genre array with Name and Description
  */
  public getGenre(name: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${name}`)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * Get director details by name
  *  @param {string} Name
  *  @returns {Observable} containing a Director array with Name
  */
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${name}`)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /* returns a user's favorite movies list from the getFavs endpoint by username
  public getFavs(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }*/

  /**
  * Add a movie to a user's favorites
  * @param {string} Username
  * @param {string} movieID
  * @returns {Observable} containing a string with a confirmation message
  */
  public getAddFav(username: string, movieID: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Accept: 'text/plain'
        }),
        responseType: 'text'
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * Removes a movie from a user's favorites
  * @param {string} Username
  * @param {string} movieID
  * @returns {Observable} containing a string with a confirmation message
  */
  public getDeleteFav(username: string, movieID: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        responseType: 'text'
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    console.error(error);
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
