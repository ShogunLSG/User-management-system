import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request: HttpClient) { }
  BASE_URL = 'http://localhost:8080/api/v1/auth/';

  registerUser(user: object) {
    this.request.post(this.BASE_URL + 'register', user).subscribe((data) => {
      console.log(data);
      return data;
    });
  }

  loginUser(userCredentails: object) {
    this.request.post(this.BASE_URL + 'authenticate', userCredentails).subscribe((data) => {
      return data;
    });
  }
}
