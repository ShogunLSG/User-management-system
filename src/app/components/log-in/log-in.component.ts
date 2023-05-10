import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor (private userService: UserService) {}

  userCredentails = {
    email: '',
    password: '',
  }

  logUserIn() {
    console.log("log user in");
    //Add log in logic like authentification and redirect to home page
    this.userService.loginUser(this.userCredentails);
  }

}
