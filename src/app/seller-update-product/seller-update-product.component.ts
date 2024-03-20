import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { book } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  bookData: undefined | book;
  updateBookMessage: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private book: BookService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let bookId = this.route.snapshot.paramMap.get('id');
    console.warn(bookId);
    bookId &&
      this.book.getBook(bookId).subscribe((data) => {
        console.warn(data);
        this.bookData = data;
      });
  }
  submit(data: any) {
    if (this.bookData) {
      data.id = this.bookData.id;
    }
    this.book.updateBook(data).subscribe((result) => {
      if (result) {
        this.updateBookMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.updateBookMessage = undefined;
       this.router.navigate(['/seller-home']);
    }, 3000);
    console.warn(data);
  }
}

