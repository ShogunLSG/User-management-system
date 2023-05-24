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
    ) { 
      this.userName = localStorage.getItem("name") || "";
      this.email = localStorage.getItem("email") || "";
      this.phonNumber = parseInt(localStorage.getItem("number") || "0");
      this.id = parseInt(localStorage.getItem("userId") || "0");
      
      console.log("name: ", this.userName);
      console.log("email: ", this.email);
      console.log("number: ", this.phonNumber);


    }
    ngOnInit(): void {
      if (!localStorage.getItem('token')) {
        this.router.navigate(['home/login']);
      }
  
      this.profileForm.patchValue({
        username: localStorage.getItem('name') || '',
        useremail: localStorage.getItem('email') || '',
        userphoneNumber: localStorage.getItem('number') || ''
      });
      this.formDisabled =true;

     
    }
  id: number;
  userName: string;
  email: string;;
  phonNumber: number;
  formDisabled: boolean = false;

  profileForm = this.fb.group({
    username: ['',Validators.required],
    useremail: ['',Validators.required],
    userphoneNumber: ['',Validators.required],
  });

  goToProfile(){
    this.router.navigate(['profile']);
  }

  redirectToChangePassword(){
    this.router.navigate(['update-password']);
  }


  saveChanges() {
    console.log("name: ", this.userName);
    console.log("email: ", this.email);
    this.userService.updateDetailsForUser(
      this.profileForm.controls.username.value,
      this.profileForm.controls.useremail.value,
      this.id,
      this.profileForm.controls.userphoneNumber.value
      ).subscribe(
      (data: any) => {
        console.log("data: ",data);
        if(data['body']['statusCodeValue'] == 200){
          alert("Details updated successfully");
        }
      }),
      (error: any) => {
        // decode token and populate local storage
        localStorage.setItem('name', this.userName);
        localStorage.setItem('email', this.email);
        localStorage.setItem('number', "yep");
        alert("Details updated successfully");
        this.formDisabled = true;
        console.log("error: ",error);
      }
      this.formDisabled = true;
  }

  deleteAccount() {
    this.userService.deleteUser(this.id).subscribe(
      (data: any) => {
        console.log("data: ",data);
        if(data['body']['statusCodeValue'] == 200){
          alert("Account deleted successfully");
          this.logout();
        }
        this.logout();
      }),
      (error: any) => {
        // decode token and populate local storage
        alert("Account deleted successfully");
        this.logout();
        console.log("error: ",error);
      }
  }
    
      

  

  

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);

  }
  

  enableEdit() {
    this.formDisabled = false;
  }


}
