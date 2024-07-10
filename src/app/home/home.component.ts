import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BookService } from '../services/book.service';
import { book } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('slider') slider!: ElementRef;
  popularBook: undefined | book[];
  trendyBooks: undefined | book[];
  constructor(private book: BookService) {}
  ngOnInit() {
    this.book.popularBook().subscribe((data) => {
      this.popularBook = data;
    });
    this.book.trendyBooks().subscribe((data) => {
      this.trendyBooks = data;
    });
  }

  prev() {
    const slider = this.slider.nativeElement;
    slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
  }

  next() {
    const slider = this.slider.nativeElement;
    slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
  }
}
