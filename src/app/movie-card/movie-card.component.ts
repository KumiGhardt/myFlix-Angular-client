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

  //get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  //movie description
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


  //director
  showDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth },
      panelClass: 'details-dialog',
    });
  }

  //genre
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  /**
   * check if movie is in favorites
   **/
  getFavoriteMovies(): void {
    this.fetchUser.getUser().subscribe((resp: any) => {
      this.favoriteMovieIds = resp.favoriteMovies;
    });
  }

  // Checks the movieID against the list of favorites and returns a boolean.
  isFavorite(movieID: string): boolean {
    let favoriteMovies = localStorage.getItem('FavoriteMovies'); 
    if(favoriteMovies !== null) 
    this.favoriteMoviesArray = JSON.parse(favoriteMovies);
    console.log(this.favoriteMoviesArray);
    return this.favoriteMoviesArray.includes(movieID);
  }

  /**
   * add or delete movie from favorites
   **/
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
        console.log(resp);
        localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies));
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(_id);
  }
}
