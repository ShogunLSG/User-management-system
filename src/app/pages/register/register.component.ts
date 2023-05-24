import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() submitted = new EventEmitter<object>();
  user: Record<string, any> = {};
  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(){
    localStorage.clear();
    console.log("User type is: "+ typeof this.user)
  }

  registrationForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',Validators.required,
    Validators.email,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    ],
    password: ['',Validators.required,
    ],
    confirmPassword: ['',Validators.required],
    phoneNumber: ['',Validators.required]
  });

  redirectToDashboard(){
    var role = localStorage.getItem('role');
    if(role == 'ADMIN'){
      this.router.navigate(['dashboard/admin']);
    }else{
      this.router.navigate(['dashboard/user']);
    }
  }

  onSubmit(event:any): void {
    event.preventDefault();

    if(this.registrationForm.invalid){
      if(this.registrationForm.value.password != this.registrationForm.value.confirmPassword){
        this.snackBar.open("Passwords do not match", "Close", {
          duration: 2000,
        });
        return;
      }

      if(this.registrationForm.errors?.['required']){
        this.snackBar.open("Please fill in all fields", "Close", {
          duration: 2000,
        });
        return;
      }

      if(this.registrationForm.errors?.['email']){
        this.snackBar.open("Please enter a valid email", "Close", {
          duration: 2000,
        });
        return;
      }
      this.snackBar.open("Please fill in all fields", "Close", {
        duration: 2000,
      });
      return;
    }

    var userCreds = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      name: this.registrationForm.value.name,
      phoneNumber: this.registrationForm.value.phoneNumber
    }

    this.userService.registerUser(userCreds).subscribe(
      (data) => {
        var decodedToken = this.jwtHelper.decodeToken(data['body']['token']);
        var token = decodedToken['token'];
        var role = decodedToken['role'];
        var id = decodedToken['id'];
        var email = decodedToken['sub'];
        var name = decodedToken['name'];
        var phoneNumber = decodedToken['phoneNumber'];

        console.log("Decoded token: "+ decodedToken.token);

          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('phoneNumber', phoneNumber);
          console.log("User role is: "+ localStorage.getItem('role'));
          this.snackBar.open("Registration successful", "Close", {
            duration: 2000,
          });
          this.router.navigate(['home/login']);




       console.log("response: ",data);


        //redirect to home page
      },
      (error) => {
        console.log("Error: ",error);
        this.snackBar.open("Registration failed", "Close", {
          duration: 2000,
        });
      }
    );
  }
}
