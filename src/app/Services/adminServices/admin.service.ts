import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private request: HttpClient ) {
  }
  ADMIN_URL = 'http://localhost:8080/api/v1/admin/';

  getUsersForAdmin(): any {
    console.log('Fetching users for admin');
    return this.request.get(this.ADMIN_URL + 'admins');
  }
// *****/OPTIONAL
  // checkEmail(email: string): any {
  //   console.log('checking email');
  //   return this.request.get(this.ADMIN_URL + 'checkEmail' + email);
  // }
  toggleLock(id: number, isLocked:boolean): any {
    console.log('toggling lock');
    return this.request.post(this.ADMIN_URL + 'toggleLock', {
      "id": id,
      "isLocked": isLocked
    });
  }

  deleteUser(id: number): any {
    console.log('deleting user');
    return this.request.delete(this.ADMIN_URL + 'deleteUser/' + id);
  }

  updateDetails(name: string, email: string, isAdmin: boolean,id: number): any {
    console.log('updating details');
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("isAdmin: ", isAdmin);
    console.log("id: ", id);

    return this.request.post(this.ADMIN_URL + 'updateDetails', {
      "id": id,
      "name": name,
      "email": email,
      "isAdmin": isAdmin
    });
  }

  

}
