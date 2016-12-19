import { environment } from './../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { User } from './user.model'
import { ErrorService } from './../errors/error.service';

@Injectable()
export class AuthService {

  constructor(private http:Http, private errorService:ErrorService) {}

  signup(user:User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(environment.api + environment.authService, body, {headers:headers})
      .map((response:Response) => response.json())
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user:User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(environment.api + environment.authService + environment.authServiceSignin, body, {headers:headers})
      .map((response:Response) => response.json())
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}
