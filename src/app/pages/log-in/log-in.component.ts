import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor (private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private fb: FormBuilder) {}
  ngOnInit() {
    localStorage.clear();
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  userCredentials = {
    email: '',
    password: '',
  }


  logUserIn(event: Event) {

    var userCreds = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    //prevent default for me
    event.preventDefault();
    console.log("User credentials: ", this.loginForm.value);

    this.userService.loginUser(userCreds).subscribe(
      (data) => {


        if(data.token) {

          console
          var decodedToken = this.jwtHelper.decodeToken(data.token);
          console.log("Decoded token: "+ decodedToken);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('email', decodedToken.sub);
          localStorage.setItem('name', decodedToken.name);
          //Admin & user have different dashboards
          if(decodedToken.role == 'ADMIN') {
            this.router.navigate(['dashboard/admin']);
          }else if(decodedToken.role == 'USER') {
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
