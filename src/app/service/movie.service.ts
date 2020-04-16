import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../model/movie';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {CountResponse} from '../model/count-response';
import {map} from 'rxjs/operators';
import {MessageResponse} from '../model/message-response';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private fallbackImg = environment.fallbackImg;

  public stub: Movie = {
    id: '',
    title: '',
    type: '',
    rating: 0,
    genres: '',
    pic_uri: this.fallbackImg,
    description: '',
    start_year: 0,
    popularity: 0,
    runtime: 0
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  public search(pattern: string, pageSize: number, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.movieUri}/search?pattern=${pattern}`
      + `&pageSize=${pageSize}&page=${page}`).pipe(
      map(movies => {
        this.addListedInfoAll(movies);
        return movies;
      }));
  }

  public searchCount(pattern: string): Observable<number> {
    return this.httpClient.get<CountResponse>(`${environment.movieUri}/search/count?pattern=${pattern}`)
      .pipe(map(response => response.count));
  }

  public findById(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${environment.movieUri}/info/${id}`)
      .pipe(
        map(movie => {
          this.addListedInfo(movie);
          return movie;
        })
      );
  }

  public addListedInfo(movie: Movie): Movie {
    if (this.authService.isAuth) {
      this.httpClient.get<MessageResponse>(`${environment.userUri}/me/listed/${movie.id}`)
        .subscribe(response => movie.listed = response.message);
    }
    return movie;
    // return this.httpClient.get<MessageResponse>(`${environment.userUri}/me/listed/${movie.id}`)
    //   .pipe(
    //     map(listed => {
    //         movie.listed = listed.message;
    //         return movie;
    //       }
    //     )
    //   );
  }

  public addListedInfoAll(movies: Movie[]): Movie[] {
    movies.forEach(movie => {
      this.addListedInfo(movie);
    });
    return movies;
  }
}
