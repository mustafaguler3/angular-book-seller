import { Role } from './models/role';
import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './guest/login/login.component';
import { HomeComponent } from './guest/home/home.component';
import { RegisterComponent } from './guest/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import {HttpClientModule } from "@angular/common/http"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path:"home",redirectTo:"home",pathMatch:"full"},
  {path:"",component: HomeComponent},
  {path:"home",component: HomeComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},

  {path:"profile",component: ProfileComponent,canActivate:[AuthGuard],data:{roles:[Role.ADMIN,Role.USER]}},
  {path:"admin",component: AdminComponent,canActivate:[AuthGuard],data:{roles:[Role.ADMIN]}},
  
  {path:"404",component: NotFoundComponent},
  {path:"401",component: UnauthorizedComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    BookComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router: Router){
    this.router.errorHandler = (err: any) => {
      this.router.navigate(["/404"]);
    }
  }
}
