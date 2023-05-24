import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/userServices/user.service';
import { FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    ) {

    this.id = this.data.user.id;
    this.phone = data.user.phone;
  }
  updateForm = this.fb.group({
    name: ['',Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z ]*$") ],
    email: ['',Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],
    phone: ['',Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")],
    role: [''],
  });

  public phoneNumber: string = localStorage.getItem("phone") || '';

  ngOnInit(): void {
    console.log("data in update details: ", this.data);
    if(this.data.user.role === "ADMIN") {
      this.isAdmin = true;
    }

    this.updateForm.patchValue({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phoneNumber"),
      role: localStorage.getItem("role")
    })
  }



  name: string = this.data.user.name;
  email: string = this.data.user.email;
  role: string = this.data.user.role;
  isAdmin: boolean = false;
  phone: number= this.data.user.phone;
  id: number;
  currentRole: string = localStorage.getItem("role") || '';
  currentIsAdmin: boolean = this.currentRole === "ADMIN" ? true : false;






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
    console.log("formInfo", this.updateForm.value)
    this.userService.updateDetails(this.name, this.email, this.isAdmin, this.id).subscribe((data: any) => {
      console.log("data in update details: ", data);
      if (data) {
        this.snackBar.open("Details Updated Successfully", "close", { duration: 3000 });
        window.location.reload();
      }
    }
    );
  }


}
