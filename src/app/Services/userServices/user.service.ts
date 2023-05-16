import { HttpClient } from '@angular/common/http';
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
    return this.request.get(this.USER_URL + 'users');
  }
}

