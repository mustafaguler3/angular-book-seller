import { Purchase } from './../../models/purchase';
import { PurchaseService } from './../../services/purchase.service';
import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/book';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: Book[] = [];
  faBook = faBook
  errorMessage: string = ""
  infoMessage: string = ""

  constructor(private authService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      data =>  {
        this.bookList = data;
      }
    )
  }

  purchase(item: Book){
    if(!this.authService.currentUserValue?.id){
      this.errorMessage = "You should log in to buy a book";
      return;
    }
    const purchase = new Purchase(this.authService.currentUserValue.id,item.id,item.price);

    this.purchaseService.savePurchase(purchase).subscribe(
      data => {
        this.infoMessage = "Mission is completed"
      },err => {
        this.errorMessage = "Unexpected error"
      }
    )
  }

}
