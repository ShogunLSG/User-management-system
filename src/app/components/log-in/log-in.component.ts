import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  logUserIn() {
    console.log("log user in");
    //Add log in logic like authentification and redirect to home page
  }

}
