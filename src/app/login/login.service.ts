import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'https://test.vista-quote.com';

export interface LoginModal {
  email: string;
  password: string;
  rememberme: boolean;
}

@Injectable()
export class LoginService {
  
  constructor(private http: HttpClient) { }
private extractData(res: Response): any {
    const body = res;
    return body || { };
  }


checkLogin(username:string, password:string): Observable<any> {
const loginInput = {
      email: username,
      password: password,
      rememberme: false
    };
    return this.http.post(endpoint + '/api/AccountApi/SignIn', loginInput).pipe(
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
