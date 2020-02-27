import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../model/movie';
import {max} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-personal-movies',
  templateUrl: './personal-movies.component.html',
  styleUrls: ['./personal-movies.component.scss']
})
export class PersonalMoviesComponent implements OnInit, OnDestroy {

  private type: string;
  private pageSize = 6;
  private maxPage = 0;
  private subscription: Subscription;

  public movies: Movie[];
  public publicPage = 0;
  public page = 0;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.listed;
      if (this.type === 'watched') {
        this.userService.getWatchedCount().subscribe(count => {
          this.maxPage = Math.floor((count - 1) / this.pageSize);
        });
      } else if (this.type === 'planned') {
        this.userService.getPlannedCount().subscribe(count => {
          this.maxPage = Math.floor((count - 1) / this.pageSize);
        });
      }
      this.toPage(0);
    });
  }

  public toPage(page: number): void {
    if (page >= 0 && page <= this.maxPage) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.type === 'watched') {
        this.subscription = this.userService.getWatched(page, this.pageSize)
          .subscribe(movies => {
            this.subscription = null;
            return this.movies = movies;
          });
      } else if (this.type === 'planned') {
        this.subscription = this.userService.getPlanned(page, this.pageSize)
          .subscribe(movies => {
            this.subscription = null;
            return this.movies = movies;
          });
      }
      this.publicPage = page;
      this.page = page;
    }
  }

  public nextPage(): void {
    this.toPage(this.page + 1);
  }

  public prevPage(): void {
    this.toPage(this.page - 1);
  }

}
