import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { book } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult: undefined | book[];
  constructor(
    private activeRoute: ActivatedRoute,
    private book: BookService
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query &&
      this.book.searchBook(query).subscribe((result) => {
        this.searchResult = result;
      });

  }
}
