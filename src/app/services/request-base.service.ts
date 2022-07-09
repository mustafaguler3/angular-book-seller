import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export abstract class RequestBaseService {
  
  protected currentUser: User = new User();

  constructor(
    protected authService: AuthenticationService,
    protected httpClient: HttpClient
  ) {
    this.authService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  get getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        authorization: "Bearer "+this.currentUser?.token,
        "Content-Type":"application/json; charset=UTF-8"
      }
    )
  }
}
