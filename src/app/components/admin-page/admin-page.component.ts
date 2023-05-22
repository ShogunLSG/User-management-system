import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/adminServices/admin.service';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { elementAt } from 'rxjs';

export interface userDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  locked: boolean;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  
  constructor( private AdminService: AdminService,
     private dialog: MatDialog,
     private router: Router
      ) { }
  
  ngOnInit() {
    
    console.log("dashboard");
    this.AdminService.getUsersForAdmin().subscribe((data: any) => {
      this.dataSource = data;
      console.log("data in for each: ", this.dataSource);
    });
  
  }
  
  redirectToProfile(): void {
    this.router.navigate(['/profile']);
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
    this.AdminService.getUsersForAdmin().subscribe((data: any) => {
      this.dataSource = data;
      console.log("data in for each: ", this.dataSource);
    });
  }


 
  dataResponse: userDetails[] = [];
  dataSource: userDetails[] = [];

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  

  changeLock(Event: any, id: number) {

    console.log("Event: ", Event);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the lock status of this user?"
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if(data) {
        console.log("Event.checked: ", Event.checked);
        this.AdminService.toggleLock(id,Event.checked).subscribe((response: any) => {
          this.refreshData();
        });
       
      }else {
        console.log("Event.checked: ", Event.checked);
        this.refreshData();
        
      }
    });


  }
    
  
  displayedColumns: string[] = ['id', 'name', 'role', 'email','edit','locked'];
}
