import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';
import { userDetails } from 'src/app/Models/userDetail';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDetailsComponent } from 'src/app/components/update-details/update-details.component';

@Component({
  selector: 'app-base-dashboard',
  templateUrl: './base-dashboard.component.html',
  styleUrls: ['./base-dashboard.component.css']
})
export class BaseDashboardComponent {

  dataResponse: userDetails[] = [];
  dataSource: userDetails[] = [];
  userRole: string = localStorage.getItem('role') || '';

  constructor( private UserService: UserService,private router: Router,private dialog: MatDialog) { }
  ngOnInit() {
    console.log("dashboard");
    this.UserService.getUsersForUser().subscribe((data: any) => {
      console.log("data: ",data);
      this.dataSource = data;
    });

  }


  logout() {
    localStorage.clear();
    this.router.navigate(['home/login']);
  }

  goToProfile(){
    this.router.navigate(['dashboard/profile']);
  }

  refreshData() {
    this.UserService.getUsersForUser().subscribe((data: any) => {
      this.dataSource = data;
      console.log("data in for each: ", this.dataSource);
    });
  }

  redirectToChangePassword(){
    this.router.navigate(['dashboard/update-password']);
  }

  redirectToDashboard(){
    var role = localStorage.getItem('role');
    if(role == 'ADMIN'){
      this.router.navigate(['dashboard/admin']);
    }else{
      this.router.navigate(['dashboard/user']);
    }
  }
}
