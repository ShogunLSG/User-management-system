import { Component } from '@angular/core';
import { pipe, pluck } from 'rxjs';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor (private userService: UserService, private router: Router) {}

  userCredentials = {
    email: '',
    password: '',
  }

  logUserIn(event: Event) {
    //prevent default for me
    event.preventDefault();

    this.userService.loginUser(this.userCredentials).subscribe(
      (data) => {
        var token = data.token;
        var userId = data.userId;
        var role = data.role;
        console.log("Token: ",token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        this.router.navigate(['/dashboard']);
        console.log("response: ",data);
        console.log("user logged in");
         //redirect to home page
       },
       (error) => {
         console.error(error);
         // Handle the error
       }
    );
  }
  //Q: command to generate a component?


  emailInput(event: any) {
    this.userCredentials.email = event.target.value;
  }

  passwordInput(event: any) {
    this.userCredentials.password = event.target.value;
  }


}
