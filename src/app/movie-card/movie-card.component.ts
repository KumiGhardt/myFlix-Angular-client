import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';


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
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

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
}
