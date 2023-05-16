import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  constructor(private userService: UserService) { }
   ngOnInit(): void {
    this.userService.getUsersForUser().subscribe((data) => {
      console.log(data);
    }); 

    }
}
