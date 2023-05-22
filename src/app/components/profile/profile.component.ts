import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService) { }
  ngOnInit(): void {}

  name: string = "name";
  email: string = "email";
  

  changeName(Event: any) {
    this.name = Event.target.value;
  }

  emailChange(Event: any) {
    this.email = Event.target.value;
  }

  saveChanges() {
    console.log("name: ", this.name);
    console.log("email: ", this.email);

  }

}
