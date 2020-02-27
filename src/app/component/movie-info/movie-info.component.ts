import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {MovieService} from '../../service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  public movie: Movie;
  public publicUserScore: number;
  public userScore: number;
  public movieRating: number;
  public fallbackImg = environment.fallbackImg;
  public clicked = false;
  public message: string;

  constructor(
    public authService: AuthService,
    private movieService: MovieService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getListedStatus(id).subscribe(listed => {
      this.movieService.findById(id).subscribe(movie => {
        this.movie = movie;
        this.movieRating = Math.round(movie.rating);
      });
      if (listed === 'watched') {
        this.userService.getWatchedById(id).subscribe((movie) => {
          if (movie.user_score) {
            this.publicUserScore = movie.user_score;
            this.userScore = movie.user_score;
          }
          if (movie.user_message) {
            this.message = movie.user_message;
          }
        });
      }
    });
  }

  public addWatched(): void {
    if (this.movie) {
      this.userService.addWatched(this.movie.id).subscribe(() => {
        this.movie.listed = 'watched';
      });
    }
  }

  public addPlanned(): void {
    if (this.movie) {
      this.userService.addPlanned(this.movie.id).subscribe(() => {
        this.movie.listed = 'planned';
      });
    }
  }

  public deleteListed(): void {
    if (this.movie) {
      this.userService.deleteListed(this.movie.id).subscribe(() => {
        this.movie.listed = '';
      });
    }
  }

  public patchWatchedScore(score: number): void {
    if (this.movie) {
      this.userService.patchWatchedScore(this.movie.id, score).subscribe(() => {
        this.publicUserScore = score;
        this.userScore = score;
      });
    }
  }

  public patchWatchedMessage(message: string): void {
    if (this.movie) {
      this.userService.patchWatchedMessage(this.movie.id, message).subscribe();
    }
  }

}
