import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';

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
  constructor(private userService: UserService, private router: Router) { }

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

  onSubmit(event:any): void {
    event.preventDefault();
    this.userService.registerUser(this.user).subscribe(
      (data) => {
        var token = data['body']['token'];
        var userId = data['body']['id'];
        var role = data['body']['role'];

        // basic login logic
        console.log("data: ",data);
        if(data['body']['statusCodeValue'] == 200){
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          this.router.navigate(['/user-home']);
        }

        alert(data['body']);

       console.log("response: ",data);

        //redirect to home page
      }
    );
  }
}
