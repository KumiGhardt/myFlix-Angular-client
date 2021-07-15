import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

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

   /**
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();    
  }

  /**
  * Gets Profile
  **/ 
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

    /**
  * Gets users favorite movies
  **/ 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
  * Filters users movies
  * @param movie_id
  **/ 
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

/**
  * deletes users movies
  * @param id
  * @param title
  * 
  **/ 
  deleteMovie(id: string, title: string): void {
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
      localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies))
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

/**
  * Updates Profile
  **/ 
  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  /**
  * deletes profile
  **/ 

  deleteUser(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }  

}
