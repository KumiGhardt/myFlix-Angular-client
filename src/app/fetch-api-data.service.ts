import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://kumi-movie-index.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})

/**
 * This service will enable communication with the movie API
 * and enable CRUD operations to be performed.
 */
export class FetchApiDataService {
  /**
   * The constructor Injects the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http.
   */
  constructor(private http: HttpClient) {}

  /**
   * This method will make the api call to the user registration endpoint.
   * @param userDetails User name, password, email and date of birth.
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to login
   * @param userDetails
   * @returns
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get all movies
   * @returns
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get one movie
   * @returns
   */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * API call to get one director
   * @returns
   */
  getOneDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:directors/:DirectorName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * API call to get a genre
   * @returns
   */
  getOneGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:genres/:GenreName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * API call to get a favorite movie from a users favorites
   * @param id
   * @returns
   */
  FavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + user + '/Movies/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
 
  /**
   * API call to add a movie from a users favorites
   * @param id
   * @returns
   */
 addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + 'users/' + user + '/Movies/' + id, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * API call to delete a movie from a users favorites
   * @param id
   * @returns
   */
  deleteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + user + '/Movies/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * Calls API to get edit a user account information
   * @returns
   */
 editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
 
  /**
   * Calls API to get a user account information
   * @returns
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * Calls API to delete a user account information
   * @returns
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors within the method used
   * @param error
   * @returns
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
          `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}
