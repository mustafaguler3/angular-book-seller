import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>

  constructor(private httpClient: HttpClient) {

    let storageUser;
    const storageUserAsStr = localStorage.getItem("currentUser");

    if (storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr)
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(API_URL + "sign-in",user).pipe(
      map(response => {
        if(response){
          localStorage.setItem("currentUser",JSON.stringify(response));
          this.currentUserSubject.next(response)
        }
        return response;
      })
    )
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(API_URL + "sign-up",user)
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(new User);
  }

}
