import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable if not already imported
import { book, cart, order } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  cartData = new EventEmitter<book[] | []>();
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
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(bookId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: book[] = JSON.parse(cartData);
      items = items.filter((item: book) => bookId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<book[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/order', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/order?userId=' + userData.id
    );
  }
}
