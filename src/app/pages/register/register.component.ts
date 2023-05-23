import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() submitted = new EventEmitter<object>();
  user: Record<string, any> = {};
  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(){
    localStorage.clear();
    console.log("User type is: "+ typeof this.user)
  }

  registrationForm = this.fb.group({
    name: ['',Validators.required,Validators.pattern("^[a-zA-Z ]*$")],
    email: ['',Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
    password: ['',Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")],
    phoneNumber: ['',Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern("^[0-9]*$")],
  });

  onSubmit(event:any): void {
    event.preventDefault();
    this.user["phoneNumber"] = this.registrationForm.value.phoneNumber;
    this.user["email"] = this.registrationForm.value.email;
    this.user["name"] = this.registrationForm.value.name;
    this.user["password"] = this.registrationForm.value.password;

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
