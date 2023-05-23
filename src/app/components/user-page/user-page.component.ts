import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { userDetails } from '../admin-page/admin-page.component';
import { Router } from '@angular/router';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { MatDialog } from '@angular/material/dialog';


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

  constructor( private UserService: UserService,private router: Router,private dialog: MatDialog) { }
  ngOnInit() {
    console.log("dashboard");
    this.UserService.getUsersForUser().subscribe((data: any) => {
      console.log("data: ",data);
      this.dataSource = data;
    });

  }
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  openDialog(row: any) {
    console.log("row: ", row);
    const dialogRef = this.dialog.open(UpdateDetailsComponent, {
      data: {
        user: row
  }
  });
  dialogRef.afterClosed().subscribe((data: any) => {

    this.refreshData();

    console.log("data in for each: ", this.dataSource);
  });
  }

  refreshData() {
    this.UserService.getUsersForUser().subscribe((data: any) => {
      this.dataSource = data;
      console.log("data in for each: ", this.dataSource);
    });
  }

  redirectToChangePassword(){
    this.router.navigate(['update-password']);
  }

}
