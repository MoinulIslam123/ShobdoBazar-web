import { Component } from '@angular/core';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private book: BookService, private router: Router) {}

  ngOnInit(): void {
    this.book.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;

      console.warn(this.totalPrice);
    });
  }
  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.book.deleteCartItems(item.id);
        }, 700);
      });

      this.book.orderNow(orderData).subscribe((result) => {
        console.warn(result);

        if (result) {
          this.orderMsg = 'Order has been placed';

          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['my-order']);
          }, 3000);
        }
      });
    }
  }
}
