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
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
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

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${JSON.stringify(error.error)}`
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

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
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
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${JSON.stringify(error.error)}`
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
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

// API call to fetch one director

@Injectable({
  providedIn: 'root',
})
export class GetOneDirectorService {
  constructor(private http: HttpClient) {}

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
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

// API call to fetch one genre

@Injectable({
  providedIn: 'root',
})
export class GetOneGenreService {
  constructor(private http: HttpClient) {}

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
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public FavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + 'users/:Username/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public FavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/:Username/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
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

  public deleteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/:Username/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}