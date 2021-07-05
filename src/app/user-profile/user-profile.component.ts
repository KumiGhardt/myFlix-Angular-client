import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {
  GetAllMoviesService,
  GetUserService,
  DeleteMovieService,
} from '../fetch-api-data.service';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = {};
  favorites: any = [];

  constructor(
    public fetchMovies: GetAllMoviesService,
    public fetchUser: GetUserService,
    public deleteFavorite: DeleteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();    
  }

  getFavoriteMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.findFavorites();
    });
  }

  findFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }


  deleteMovie(id: string, title: string): void {
    this.deleteFavorite.deleteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchUser.getUser().subscribe((res: any) => {
      this.user = res;
      return this.user;
    });
  }
  

  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  deleteUser(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }  

}
