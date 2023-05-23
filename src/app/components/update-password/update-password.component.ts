import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
    ) { }

  ngOninit() {}


  updatePasswordForm = this.fb.group({
    oldPassword: ['',Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern("^[a-zA-Z0-9!@#$%^&*]*$")],
    newPassword: ['',Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern("^[a-zA-Z0-9!@#$%^&*]*$")],
    confirmPassword: ['',Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern("^[a-zA-Z0-9!@#$%^&*]*$")],
  });



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

        var userOld =
        {
          "email": localStorage.getItem("email"),
          "password": this.oldPassword
        }



        // this.userService.loginUser(userOld).subscribe((data: any) => {
        //   console.log("data from response: ", data);

        //   if (!data) {
        //     alert("old password is incorrect");
        //     return;
        //   }
        // });

        console.log("old password is correct");
        this.userService.updatePassword(id, this.newPassword).subscribe((data: any) => {
          console.log("data from response: ", data);
          if (data) {
            alert("password updated successfully");
            this.router.navigate(['/profile']);
          }
        },(error: any)=>{
          if(error.status == 200){
            alert("password updated successfully");
            this.router.navigate(['dashboard/profile']);
          }

        });
      }else{
        alert("An issue occured while updating password. Please login again");
        this.router.navigate(['/login']);
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

