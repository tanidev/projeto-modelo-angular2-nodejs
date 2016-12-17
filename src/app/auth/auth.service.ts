import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { User } from './user.model'

@Injectable()
export class AuthService {

  constructor(private http:Http) {}

  signup(user:User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers:headers})
      .map((response:Response) => response.json())
      .catch((error:Response) => Observable.throw(error.json()));
  }
}
