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
       

        if(data.token) {
          var token = data.token;
          var userId = data.userId;
          var role = data.role;
          console.log("Token: ",token);
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          //Admin & user have different dashboards
          if(role == 'ADMIN') {
            this.router.navigate(['admin']);
          }else if(role == 'USER') {
            this.router.navigate(['user']);
          }else {
            console.log("Role not found");
          }

          console.log("response: ",data);
          console.log("user logged in");
          alert("User logged in");
           //redirect to home page
        }else {
          console.log("response: ",data);
          console.log("user not logged in");
          alert("User not logged in");
        }
       
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
