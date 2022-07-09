import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-book-seller';

  currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService,
              private router: Router){
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authenticationService.logout()
    this.router.navigate(["/login"])
  }

}
