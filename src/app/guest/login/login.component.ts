import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";
  
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

  }

  login(){
      this.authenticationService.login(this.user).subscribe(
        data => {
          this.router.navigate(["/profile"])
        },err => {
          this.errorMessage = "Username or password is incorrect"
        }
      )
  }

}
