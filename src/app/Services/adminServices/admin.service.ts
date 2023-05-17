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
}
