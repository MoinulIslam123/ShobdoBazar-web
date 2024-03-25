import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { book, cart } from '../data-type';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  bookData: undefined | book;
  productQuantity: number = 1;
  removeCart = false;
  cartData: book | undefined;

  constructor(private activeRoute: ActivatedRoute, private book: BookService) {}

  ngOnInit(): void {
    let bookId = this.activeRoute.snapshot.paramMap.get('bookId');

    bookId &&
      this.book.getBook(bookId).subscribe((result) => {
        this.bookData = result;

        let cartData = localStorage.getItem('localCart');
        if (bookId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: book) => bookId === item.id.toString());
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.book.getCartList(userId);

          this.book.cartData.subscribe((result) => {
            let item = result.filter(
              (item: book) => bookId?.toString() === item.bookId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addCart() {
    if (this.bookData) {
      this.bookData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.book.localAddCart(this.bookData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.bookData,
          userId,
          bookId: this.bookData.id,
        };
        delete cartData.id;

        this.book.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Book is added in Cart.');
            this.book.getCartList(userId); //40
            this.removeCart = true; //40
          }
        });
      }
    }
  }
  removeToCart(bookId: number) {
    if (!localStorage.getItem('user')) {
      this.book.removeItemFromCart(bookId);
    } else {
 

      this.cartData &&
        this.book.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.book.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
}
