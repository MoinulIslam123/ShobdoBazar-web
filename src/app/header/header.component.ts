import { ParseError } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { book } from '../data-type';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | book[];
  userName: string = '';
  cartItem = 0;
  constructor(private route: Router, private book: BookService) {}
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //"includes"seller related jaa hobe shob kichutei seller thaakbei
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.book.getCartList(userData.id)
        } else {
          console.warn('outside seller area');
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.book.cartData.subscribe((items) => {
      this.cartItem = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.book.cartData.emit([]);
  }
  searchBook(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    this.book.searchBook(element.value).subscribe((result) => {
      this.searchResult = result;
    });
  }
}
