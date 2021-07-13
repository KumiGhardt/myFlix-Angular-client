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

// API call to user registration endpoint
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   *
   * @param http
   */
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  /**
   * API call to register new user account
   * @param userDetails
   * @returns
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Handles errors to register
   * @param error
   * @returns
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// API call to user login endpoint

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}
  /**
   * API call to login
   * @param userDetails
   * @returns
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Handles errors to login
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

/**
 * MOVIE ROUTES
 */

// API call to fetch all movie data

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}
  /**
   * API call to get all movies
   * @returns
   */
  public getAllMovies(): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get all movies
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

// API call to fetch one movie
@Injectable({
  providedIn: 'root',
})
export class GetOneMoviesService {
  constructor(private http: HttpClient) {}
  /**
   * API call to get one movie
   * @returns
   */
  public getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
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
   * Handles errors to get a movie
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

// API call to fetch one director

@Injectable({
  providedIn: 'root',
})
export class GetMovieDirectorService {
  constructor(private http: HttpClient) {}
  /**
   * API call to get one director
   * @returns
   */
  public getOneDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:directors/:DirectorName', {
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
   * Handles errors to get a director
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

// API call to fetch one genre

@Injectable({
  providedIn: 'root',
})
export class GetMovieGenreService {
  constructor(private http: HttpClient) {}
  /**
   * API call to get a genre
   * @returns
   */
  public getOneGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:genres/:GenreName', {
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
   * Handles errors to get a genre
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

//favourite movie
@Injectable({
  providedIn: 'root',
})
export class GetFavoriteMovieService {
  constructor(private http: HttpClient) {}
  /**
   * API call to get a favorite movie from a users favorites
   * @param id
   * @returns
   */
  public FavoriteMovie(id: string): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get a genre
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

//add movie to favorites
@Injectable({
  providedIn: 'root',
})
export class GetAddFavoriteMovieService {
  constructor(private http: HttpClient) {}
  /**
   * API call to adda movie from a users favorites
   * @param id
   * @returns
   */
  public FavoriteMovie(id: string): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get a genre
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

//Delete a movie from the favorite movies

@Injectable({
  providedIn: 'root',
})
export class DeleteMovieService {
  constructor(private http: HttpClient) {}
  /**
   * API call to delete a movie from a users favorites
   * @param id
   * @returns
   */
  public deleteMovie(id: string): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get a genre
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

//Edit user
@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) {}
  /**
   * Calls API to get edit a user account information
   * @returns
   */
  public editUser(): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get user account information
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

//get a user
@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {}
  /**
   * Calls API to get a user account information
   * @returns
   */
  public getUser(): Observable<any> {
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
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors to get user account information
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

//Delete user
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}
  /**
   * Calls API to delete a user account information
   * @returns
   */
  public deleteUser(): Observable<any> {
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
   * Handles errors to get user account information
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
