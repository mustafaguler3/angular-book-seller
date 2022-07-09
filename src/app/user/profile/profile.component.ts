import { PurchaseItem } from './../../models/purchase-item';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  purchaseItemList: PurchaseItem[] = [];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItems().subscribe(
      data => {
        this.purchaseItemList = data;
      }
    )
  }

}
