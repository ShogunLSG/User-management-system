import { Component } from '@angular/core';
import { pipe, pluck } from 'rxjs';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor (private userService: UserService, private router: Router,private jwtHelper: JwtHelperService) {}

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
          var decodedToken = this.jwtHelper.decodeToken(token);
          console.log(decodedToken);
          localStorage.setItem('token', token);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('userId', decodedToken.userId);
          localStorage.setItem('email', decodedToken.sub);
          localStorage.setItem('name', decodedToken.name);
          //Admin & user have different dashboards
          if(role == 'ADMIN') {
            this.router.navigate(['dashboard/admin']);
          }else if(role == 'USER') {
            this.router.navigate(['dashboard/user']);
          }else {
            console.log("Role not found");
          }


          alert("User logged in");
           //redirect to home page
        }else {

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
