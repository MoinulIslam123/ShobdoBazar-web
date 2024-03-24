import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { book } from '../data-type';
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
      console.warn(this.bookData);
      this.book.localAddCart(this.bookData);
      this.removeCart = true;
    }
    else{
      console.warn("user is login");
      
      let user= localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      console.log(userId);
      let cartData={
        ...this.bookData,userId
      }
      console.warn(cartData)
    }
  }
  }
  removeToCart(bookId: number) {
 this.book.removeItemFromCart(bookId);
       this.removeCart = false;
  }
}
