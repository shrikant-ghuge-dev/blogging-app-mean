import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private searchTextSubject = new Subject<string>();
  searchTextSubject$: Observable<string> = this.searchTextSubject.asObservable();


  private categoryPostsFilterSubject = new Subject<string>();
  categoryPostsFilterSubject$: Observable<string> = this.categoryPostsFilterSubject.asObservable();

  constructor() { }

  searchText(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  categoryPostsFilter(CatId: string) {
    this.categoryPostsFilterSubject.next(CatId);
  }
}
