import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable if not already imported
import { book } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  cartData= new EventEmitter<book[] |[]>();
  constructor(private http: HttpClient) {}

  addBook(data: book): Observable<any> {
    return this.http.post('http://localhost:3000/books', data);
  }

  bookList() {
    return this.http.get<book[]>('http://localhost:3000/books');
  }
  deleteBook(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
  getBook(id: string) {
    return this.http.get<book>(`http://localhost:3000/books/${id}`);
  }
  updateBook(book: book) {
    return this.http.put<book>(`http://localhost:3000/books/${book.id}`, book);
  }
  popularBook() {
    return this.http.get<book[]>('http://localhost:3000/books?_limit=4');
  }
  trendyBooks() {
    return this.http.get<book[]>('http://localhost:3000/books?_limit=8');
  }
  searchBook(query: string) {
    return this.http.get<book[]>(`http://localhost:3000/books?q=${query}`);
  }

  localAddCart(data: book) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));

    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(bookId:number){
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: book[] = JSON.parse(cartData);
      items = items.filter((item: book) => bookId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}
