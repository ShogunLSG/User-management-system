import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/Services/userServices/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    ) { }

  ngOnInit(){
    localStorage.clear();
    console.log("User type is: "+ typeof this.user)
  }

  registrationForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',Validators.required,
    Validators.email,
    ],
    password: ['',Validators.required,
    ],
    phoneNumber: ['',Validators.required]
  });

  onSubmit(event:any): void {
    event.preventDefault();
    var userCreds = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      name: this.registrationForm.value.name,
      phoneNumber: this.registrationForm.value.phoneNumber
    }

    this.userService.registerUser(userCreds).subscribe(
      (data) => {
        var decodedToken = this.jwtHelper.decodeToken(data['body']['token']);
        var token = decodedToken['token'];
        var role = decodedToken['role'];
        var id = decodedToken['id'];
        var email = decodedToken['sub'];
        var name = decodedToken['name'];
        var phoneNumber = decodedToken['phoneNumber'];

        // basic login logic
        console.log("data: ",data);
        if(data['body']['statusCodeValue'] == 200){
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('phoneNumber', phoneNumber);
        }

        alert(data['body']);

       console.log("response: ",data);

        //redirect to home page
      }
    );
  }
}
