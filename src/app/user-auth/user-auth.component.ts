import { Component } from '@angular/core';
import { Login, SignUp, cart, book } from '../data-type';
import { UserService } from '../services/user.service';

import { BookService } from '../services/book.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authorizationError: string = '';
  constructor(private user: UserService, private book: BookService) {}
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  Login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn(result);
      if (result) {
        this.authorizationError = 'User not found';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: book[] = JSON.parse(data);

      cartDataList.forEach((book: book, index) => {
        let cartData: cart = {
          ...book,
          bookId: book.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.book.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.book.getCartList(userId);
    }, 2000);
  }
}
