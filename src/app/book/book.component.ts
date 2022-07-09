import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book = new Book();
  errorMessage: string = ""

  @Output() save = new EventEmitter<any>();
  constructor(private bookService: BookService) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveBook(){
    this.bookService.saveBook(this.book).subscribe(
      data => {
        this.save.emit(data)
        $("#bookModal").modal("hide")
      },err => {
        this.errorMessage = "Unexpected error occurred";
      }
    )
  }

  showBookModal(){
    $("#bookModal").modal("show")
  }

}
