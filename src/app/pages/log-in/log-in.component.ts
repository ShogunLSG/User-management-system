import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor (private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    ) {}
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

  displayError = false;


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


        if(data) {

          console
          var decodedToken = this.jwtHelper.decodeToken(data.token);
          console.log("Decoded token: "+ decodedToken);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('email', decodedToken.sub);
          localStorage.setItem('name', decodedToken.name);
          localStorage.setItem('phoneNumber', decodedToken.phoneNumber);
          //Admin & user have different dashboards


          if(decodedToken.role == 'ADMIN') {
            this.router.navigate(['dashboard/admin']);
          }else if(decodedToken.role == 'USER') {
            this.router.navigate(['dashboard/user']);
          }else {
            console.log("Role not found");
          }
          this.snackBar.open("Logged in successfully", "Close",
          {
            duration: 2000,
          });
           //redirect to home page
        }else {
          this.snackBar.open("Account may be locked please contact an Admin", "Close", {
            duration: 2000,
          });
          console.log("Invalid credentials");


        }

      },
      (error) => {
        console.log("data", error )
        this.snackBar.open("Invalid credentials", "Close", {
          duration: 2000,
        });
        console.log("Error: ", error);
        this.displayError = true;
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
