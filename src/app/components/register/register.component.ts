import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() submitted = new EventEmitter<object>();
  user ={
    name: '',
    email: '',
    password: '',
  }
  constructor(private userService: UserService) { }

  ngOnInit(){
  }

  onEmailChange(event: any): void {
    this.user.email = event.value;
  }

  onPasswordChange(event: any): void {
    console.log(event.value);
    this.user.password = event.value;
  }

  onNameChange(event: any): void {
    this.user.name = event.value;
  }



  async onSubmit(event:any) {
    event.preventDefault();
    var response =this.userService.registerUser(this.user);
    console.log("response" + response);
  }
}

