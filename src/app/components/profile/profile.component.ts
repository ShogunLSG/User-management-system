import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) { }
  ngOnInit(): void {}

  name: string = localStorage.getItem("name") || "";
  email: string = localStorage.getItem("email") || "";
  number: string = localStorage.getItem("number") || "";
  editable: boolean = true;

  profileForm = this.fb.group({
    name: ['',Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z ]*$") ],
    email: ['',Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
    phoneNumber: ['',Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")],
  });

  changeName(Event: any) {
    this.name = Event.target.value;
  }

  emailChange(Event: any) {
    this.email = Event.target.value;
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  redirectToChangePassword(){
    this.router.navigate(['update-password']);
  }


  saveChanges() {
    console.log("name: ", this.name);
    console.log("email: ", this.email);

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);

  }

  numberChange(Event: any) {
    this.number = Event.target.value;
  }

  enableEdit() {
    this.editable = true;
  }


}
