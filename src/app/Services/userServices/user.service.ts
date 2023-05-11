import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request: HttpClient) { }
  BASE_URL = 'http://localhost:8080/api/v1/auth/';

  registerUser(user: object): Observable<any> {
    return this.request.post(this.BASE_URL + 'register', user);
  }

  loginUser(userCredentails: object): Observable<any> {
    return this.request.post(this.BASE_URL + 'authenticate', userCredentails)
  };
}

