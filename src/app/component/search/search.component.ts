import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../../service/movie.service';
import {Movie} from '../../model/movie';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public movies: Movie[];
  public pattern = '';
  public publicPage = 1;
  public currentPage = 0;

  private pageSize = 12;
  private subscription: Subscription;
  private maxPage = 9999;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public search(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.movieService.search(this.pattern, this.pageSize, this.currentPage).subscribe(movies => {
      this.movies = movies;
      this.subscription = null;
    });
  }

  public toPage(page: number): void {
    if (page >= 0 && page <= this.maxPage && page !== this.currentPage) {
      this.currentPage = page;
      this.publicPage = page + 1;
      this.search();
    }
  }

  public nextPage(): void {
    this.toPage(this.currentPage + 1);
  }

  public prevPage(): void {
    this.toPage(this.currentPage - 1);
  }
}
