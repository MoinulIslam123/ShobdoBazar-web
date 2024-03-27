import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { book, cart } from '../data-type';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit {
  allBooks: book[] = [];
  bookData: book | undefined;
  productQuantity: number = 1;
 

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch all books
    this.bookService.allBooks().subscribe((data) => {
      this.allBooks = data;
    });
  }

  addCart(item: book) {
    if (item) {
      item.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.bookService.localAddCart(item);
        alert('Book added to cart successfully.');
      } else {
        let user = localStorage.getItem('user');
        if (user) {
          let userId = JSON.parse(user).id;
          let cartData: cart = {
            ...item,
            userId,
            bookId: item.id,
          };
          delete cartData.id;

          this.bookService.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert('Book is added in Cart.');
              this.bookService.getCartList(userId);
            }
          });
        }
      }
    }
  }
}
