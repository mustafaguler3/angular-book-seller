import { BookComponent } from './../../book/book.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  errorMessage: string = ""
  bookList: Book[] = [];
  selectedBook: Book = new Book()

  @ViewChild(BookComponent) child: BookComponent | undefined
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      data => {
        this.bookList = data;
      }
    )
  }

  createBookRequest(){
    this.selectedBook = new Book();
    this.child?.showBookModal()
  }

  saveBookWatcher(book: Book){
    let itemIndex = this.bookList.findIndex(item => item.id === book.id);
    if(itemIndex !== -1){
      this.bookList[itemIndex] = book;
    }else{
      this.bookList.push(book)
    }
    
  }

  editBookWatcher(item: Book){
    this.selectedBook = Object.assign({},item);//kopyasını oluşturduk
    this.child?.showBookModal();
  }

  deleteBook(item: Book, ind: number){
    this.bookService.deleteBook(item).subscribe(
      data => {
        this.bookList.splice(ind,1);
      },err=>{
        this.errorMessage = "Unexpected error occurred"
      }
    )
  }

}
