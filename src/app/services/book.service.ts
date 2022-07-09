import { Book } from './../models/book';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.BASE_URL}/api/book`

@Injectable({
  providedIn: 'root'
})
export class BookService extends RequestBaseService{  

  constructor(authService:AuthenticationService,httpClient: HttpClient) { 
    super(authService,httpClient)
  }

  saveBook(book: Book): Observable<any>{
    return this.httpClient.post(API_URL,book,{headers: this.getHeaders});
  }

  deleteBook(book: Book): Observable<any> {
    return this.httpClient.delete(`${API_URL}/${book.id}`,{headers: this.getHeaders})
  }

  getAllBooks(): Observable<any> {
    return this.httpClient.get(API_URL)
  }
}
