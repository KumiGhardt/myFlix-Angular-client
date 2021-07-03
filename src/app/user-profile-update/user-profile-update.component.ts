import { Component, OnInit, Input } from '@angular/core';
import { EditUserService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };


  constructor(
    public amendUser: EditUserService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.amendUser.editUser().subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', res.Username);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}
