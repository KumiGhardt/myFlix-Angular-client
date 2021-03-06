import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

//route
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };
  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   * @param router
   */
    constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
    ) {}

  ngOnInit(): void {
  }

  /**
   * User login
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //set the user details in local storage
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('FavoriteMovies', JSON.stringify(result.user.FavoriteMovies));
      localStorage.setItem('token', result.token);

    this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("succes", 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    });
    
  }
}