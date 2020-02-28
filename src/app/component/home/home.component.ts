import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {AuthService} from '../../service/auth.service';
import {MovieService} from '../../service/movie.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public watchedCount = 0;
  public plannedCount = 0;
  public watched: Movie[] = [];
  public planned: Movie[] = [];
  public username = '';
  public password = '';
  public usernameReg = '';
  public passwordReg = '';
  public email = '';
  public firstName = '';
  public lastName = '';
  public maxListSize = 6;

  constructor(
    public authService: AuthService,
    private movieService: MovieService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isAuth) {
      this.userService.getRecommended(6).subscribe(movies => {
        this.movies = movies;
      });
    } else {
      this.movieService.search('', 6, 0).subscribe(movies => {
        this.movies = movies;
      });
    }
    if (this.authService.isAuth) {
      this.userService.getWatchedCount().subscribe(count => this.watchedCount = count);
      this.userService.getPlannedCount().subscribe(count => this.plannedCount = count);
      this.userService.getPlanned(0, this.maxListSize).subscribe(movies => this.planned = movies);
      this.userService.getWatched(0, this.maxListSize).subscribe(movies => this.watched = movies);
    }
  }

  public logIn(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigateByUrl(`${environment.navigateAfterLogin}`);
      }, () => {
        this.router.navigate(['/login'], {queryParams: {error: true}});
      });
  }

  public signUp(): void {
    this.authService.register(this.usernameReg, this.email, this.passwordReg, this.firstName, this.lastName)
      .subscribe(
        () => {
          this.router.navigateByUrl('/login');
        },
        value => {
          const params = {
            username_error: null,
            email_error: null
          };
          if (value.error.message.startsWith('User')) {
            params.username_error = true;
          }
          if (value.error.message.startsWith('E-mail')) {
            params.email_error = true;
          }
          if (value.error.message1) {
            if (value.error.message1.startsWith('User')) {
              params.username_error = true;
            }
            if (value.error.message1.startsWith('E-mail')) {
              params.email_error = true;
            }
          }
          this.router.navigate(['/signup'], {queryParams: params});
        }
      );
  }
}
