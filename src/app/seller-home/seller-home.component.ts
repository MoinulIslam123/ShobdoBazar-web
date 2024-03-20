import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { book } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  bookList: undefined | book[];
  bookMessage: undefined | string;
  icon = faTrash;
  updateBook = faEdit;
  constructor(private book: BookService) {}

  ngOnInit(): void {
    this.book.bookList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.bookList = result;
      }
    });
  }

  deleteBook(id: number) {
    this.book.deleteBook(id).subscribe((result) => {
      if (result) {
        this.bookMessage = 'Book is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.bookMessage = undefined;
    }, 3000);
  }
  list() {
    this.book.bookList().subscribe((result) => {
      if (result) {
        this.bookList = result;
      }
    });
  }
}
