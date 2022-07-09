import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import { Purchase } from '../models/purchase';

const API_URL = `${environment.BASE_URL}/api/purchase-history`

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService{

  constructor(authService: AuthenticationService,
              httpClient: HttpClient) {
                super(authService,httpClient)
  }

  savePurchase(purchase: Purchase): Observable<any>{
    return this.httpClient.post(API_URL,purchase,{headers:this.getHeaders})
  }

  getAllPurchaseItems(): Observable<any>{
    return this.httpClient.get(API_URL,{headers:this.getHeaders})
  }
}
