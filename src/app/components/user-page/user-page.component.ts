import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { userDetails } from '../admin-page/admin-page.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  dataSource: userDetails[] = [];

  constructor( private UserService: UserService,private router: Router) { }
  ngOnInit() {
    console.log("dashboard");
    this.UserService.getUsersForUser().subscribe((data: any) => {
      console.log("data: ",data);
      this.dataSource = data;
    });

  }
  displayedColumns: string[] = ['id', 'name', 'email', 'role','edit'];

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
