import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { 
    
    this.id = this.data.user.id;
  }
  
  ngOnInit(): void {
    console.log("data in update details: ", this.data);
    if(this.data.user.role === "ADMIN") {
      this.isAdmin = true;
    }


  }

  name: string = this.data.user.name;
  email: string = this.data.user.email;
  role: string = this.data.user.role;
  isAdmin: boolean = false;
  id: number;

  
  

  changeName(Event: any) {
    this.name = Event.target.value;
  }

  emailChange(Event: any) {
    this.email = Event.target.value;
    // **********OPTIONAL**********//
    // this.adminService.checkEmail(this.email);
    // you stopped here make checkemail work in admin service
  }

  changeRole(Event: any) {
    console.log("Role change event Info: ", Event.checked);
    this.isAdmin = Event.checked;
    }

  saveChanges() {
    console.log("name: ", this.name);
    console.log("email: ", this.email);
    console.log("role: ", this.role);
    console.log("isAdmin: ", this.isAdmin);
    console.log("id: ", this.id);
    this.userService.updateDetails(this.name, this.email, this.isAdmin, this.id).subscribe((data: any) => {
      console.log("data in update details: ", data);
    }
    );
  }


}
