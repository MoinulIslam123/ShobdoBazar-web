import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { book } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addBookMessage: string | undefined;
  constructor(private book: BookService, private router: Router) {}
  submit(data: book) {
    this.book.addBook(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addBookMessage = 'Book Added Successfully';
        this.router.navigate(['/seller-home']);
      }
      setTimeout(() => (this.addBookMessage = undefined), 3000);
    });
  }
}
