import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request: HttpClient) { }
  AUTH_URL = 'http://localhost:8080/api/v1/auth/';
  USER_URL = 'http://localhost:8080/api/v1/user/';

  registerUser(user: object): Observable<any> {
    return this.request.post(this.AUTH_URL + 'register', user);
  }

  loginUser(userCredentails: object): Observable<any> {
    return this.request.post(this.AUTH_URL + 'authenticate', userCredentails)
  };

  getUsersForUser(): Observable<any> {
    console.log('Fetching users for user');
    return this.request.get(this.USER_URL + 'users');


  }

  // ********** Move this to admin service **********
  updateDetails(name: string, email: string, isAdmin: boolean,id: number): any {
    console.log('updating details');
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("isAdmin: ", isAdmin);
    console.log("id: ", id);

    return this.request.post(this.USER_URL + 'updateDetails', {
      "id": id,
      "name": name,
      "email": email,
      "isAdmin": isAdmin

    });
  }

  updateDetailsForUser(name: any, email:any, id: any, phone:any): any {
    return this.request.post(this.USER_URL + 'updateMyDetails',{
      "id": id,
      "name": name,
      "email": email,
      "phone": phone

    });
  }

  deleteUser(id: number): any {
    console.log('deleting user');
    return this.request.delete(this.USER_URL + 'deleteUser/' + id);
  }
      

  updatePassword(id: number,password: string): any {
    console.log('updating password');
    return this.request.post(this.USER_URL + 'updatePassword', {
      "id": id,
      "password": password
    });
  }
}

