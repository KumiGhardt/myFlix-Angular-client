import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
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

export class MovieCardComponent {
  //the movies returned from the API call 
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

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
  showDirectorDialog(
    name: string,
    bio: string,
    birth: string,
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth},
      panelClass: 'details-dialog',
    });
  }

  //genre
  showGenreDialog(
    name: string, 
    description: string
    ): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }


}

