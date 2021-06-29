import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//brings in the API calls 
import { UserLoginService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };
  
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      console.log(result);
      //set the user details in local storage
      localStorage.setItem('user', result.user._id);
      localStorage.setItem('token', result.token);

    this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("succes", 'OK', {
        duration: 2000
      });
    });
  }
}