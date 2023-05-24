import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management';
  constructor(private router: Router, private jwthelper: JwtHelperService) { }
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['home/login']);
    }else{
      var token = localStorage.getItem('token') || "";
      var decodedToken = this.jwthelper.decodeToken(token);
      var role = decodedToken['role'];
      if(role == "ADMIN"){
        this.router.navigate(['dashboard/admin']);
      }else{
        this.router.navigate(['dashboard/user']);
      }

      
    }
  }

}
