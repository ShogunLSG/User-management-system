import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'User'];
  user ={
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  }
  constructor(private registerService: RegisterService) { }

  ngOnInit(){
  }

  onEmailChange(event: any): void {
    this.user.email = event.value;
  }

  onPasswordChange(event: any): void {
    console.log(event.value);
    this.user.password = event.value;
  }

  onFirstNameChange(event: any): void {
    this.user.firstName = event.value;
  }

  onLastNameChange(event: any): void {
    this.user.lastName = event.value;
  }




  registerUser() {
      console.log(this.user);
    this.registerService.registerUser(this.user).subscribe(
      (response) => {
        console.log("response");
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
