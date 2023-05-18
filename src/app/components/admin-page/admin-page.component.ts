import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/adminServices/admin.service';

export interface userDetails {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  links = ['First', 'Second', 'Third'];
  dataResponse: userDetails[] = [];
  dataSource: userDetails[] = [];

  constructor( private AdminService: AdminService) { }
  ngOnInit() {
    console.log("dashboard");
    this.AdminService.getUsersForAdmin().subscribe((data: any) => {
      this.dataSource = data;
      console.log("data in for each: ", this.dataSource);
    });

  }
  displayedColumns: string[] = ['id', 'name', 'role', 'email'];
}
