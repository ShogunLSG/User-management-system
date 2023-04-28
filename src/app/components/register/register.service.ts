import { Injectable } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
  private registerUrl = 'api/register';
  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<RegisterComponent> {
    return this.http.post<RegisterComponent>(this.registerUrl, user)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);

      })
    );
  }
}
