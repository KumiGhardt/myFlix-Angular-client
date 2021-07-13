import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  GetAddFavoriteMovieService,
  DeleteMovieService,
  GetUserService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  //the movies returned from the API call
  movies: any[] = [];
  favoriteMoviesArray: string[]= [];
  favoriteMovieIds: any[] = [];

  /**
   *
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */

  constructor(
    public fetchApiData: GetAllMoviesService,
    public addFavoriteMovie: GetAddFavoriteMovieService,
    public fetchdeleteFavoriteMovie: DeleteMovieService,
    public fetchUser: GetUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

/**
 * gets all movies
 */  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   *
   * @param synopsis
   * Opens modal with movie description 
   */
  showDescriptionDialog(
    title: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, description, director, genre },
      panelClass: 'details-dialog',
    });
  }


  /**
   *
   * @param name
   * @param bio
   * @param birth
   * Opens modal with movie director information
   */ 
  showDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth },
      panelClass: 'details-dialog',
    });
  }

   /**
   *
   * @param name
   * @param description
   * Opens modal with movie genre information
   */ 
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  /**
   * checks if movie is in user's list of favorites
   * @param movie_id
   * @returns 
   */
  getFavoriteMovies(): void {
    this.fetchUser.getUser().subscribe((resp: any) => {
      this.favoriteMovieIds = resp.favoriteMovies;
    });
  }

   /**
   * Adds or removes movie from user's list of favorites
   * @param id
   * @returns
   */
  isFavorite(movieID: string): boolean {
    let favoriteMovies = localStorage.getItem('FavoriteMovies'); 
    if(favoriteMovies !== null) 
    this.favoriteMoviesArray = JSON.parse(favoriteMovies);
    return this.favoriteMoviesArray.includes(movieID);
  }

  /**
   * Adds or removes movie from user's list of favorites
   * @param id
   * @returns
   */
  onToggleFavoriteMovie(_id: string): any {
    if (this.isFavorite(_id)) {
      this.fetchdeleteFavoriteMovie.deleteMovie(_id).subscribe((resp: any) => {
        localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies))
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(_id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.addFavoriteMovie.FavoriteMovie(_id).subscribe((resp: any) => {
        localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies));
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(_id);
  }
}
