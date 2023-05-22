import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  constructor(private router: Router, private userService: UserService) { }



  redirectToProfile(): void {
    this.router.navigate(['/profile']);
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updatePassword() {

    if (this.newPassword === this.confirmPassword) {
      console.log("old password: ", this.oldPassword);
      console.log("new password: ", this.newPassword);
      console.log("confirm password: ", this.confirmPassword);
      const id = parseInt(localStorage.getItem("userId") || "");
      if (id != null) {
        this.userService.updatePassword(id, this.newPassword).subscribe((data: any) => {
          console.log("data: ", data);

        },
          (error: any) => {
            console.log(error);
            alert(error.error.message)
          });
        alert("password updated successfully");
      }


    }else{
      // display alert with message "passwords do not match"
      alert("passwords do not match");
    }
}
  //Q:how to convert string to int



  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  oldPasswordChange(Event: any) {
    this.oldPassword = Event.target.value;
  }

  newPasswordChange(Event: any) {
    this.newPassword = Event.target.value;
  }

  confirmPasswordChange(Event: any) {
    this.confirmPassword = Event.target.value;
  }



}

