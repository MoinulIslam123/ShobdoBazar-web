import { Component } from '@angular/core';
import { order } from '../data-type';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent {
  orderData: order[] | undefined;
  constructor(private book: BookService) {}

  ngOnInit(): void {
    this.getOrderList();
  }
  // cancelOrder(orderId: number | undefined) {
  //   orderId &&
  //     this.book.cancelOrder(orderId).subscribe((result) => {
  //       if (result) {
  //         this.getOrderList();
  //       }
  //     });
  // }
  getOrderList() {
    this.book.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
