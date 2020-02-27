import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../model/movie';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {CountResponse} from '../model/count-response';
import {map} from 'rxjs/operators';
import {WatchedMovie} from '../model/watched-movie';
import {PlannedMovie} from '../model/planned-movie';
import {MovieService} from './movie.service';
import {MessageResponse} from '../model/message-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private movieService: MovieService
  ) {
  }

  public getWatchedById(id: string): Observable<WatchedMovie> {
    return this.httpClient.get<WatchedMovie>(`${environment.userUri}/me/watched/${id}`);
  }

  public getRecommended(count: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.userUri}/me/recommend?count=${count}`)
      .pipe(map(movies => this.movieService.addListedInfoAll(movies)));
  }

  public getWatched(page: number, pageSize: number): Observable<WatchedMovie[]> {
    return this.httpClient.get<WatchedMovie[]>(
      `${environment.userUri}/me/watched?pageSize=${pageSize}&page=${page}`)
      .pipe(map(movies => {
          this.movieService.addListedInfoAll(movies);
          return movies;
        })
      );
  }

  public getPlanned(page: number, pageSize: number): Observable<PlannedMovie[]> {
    return this.httpClient.get<PlannedMovie[]>(
      `${environment.userUri}/me/planned?pageSize=${pageSize}&page=${page}`)
      .pipe(map(movies => {
          this.movieService.addListedInfoAll(movies);
          return movies;
        })
      );
  }

  public getWatchedCount(): Observable<number> {
    return this.httpClient.get<CountResponse>(`${environment.userUri}/me/watched/count`)
      .pipe(map(response => response.count));
  }

  public getPlannedCount(): Observable<number> {
    return this.httpClient.get<CountResponse>(`${environment.userUri}/me/planned/count`)
      .pipe(map(response => response.count));
  }

  public addPlanned(id: string): Observable<void> {
    const formData = new FormData();
    formData.append('movieId', id);
    return this.httpClient.post<void>(`${environment.userUri}/me/planned`, formData);
  }

  public addWatched(id: string, score?: number, message?: string): Observable<void> {
    const formData = new FormData();
    formData.append('movieId', id);
    if (score) {
      formData.append('score', score.toString());
    }
    if (message) {
      formData.append('message', message);
    }
    return this.httpClient.post<void>(`${environment.userUri}/me/watched`, formData);
  }

  public deleteListed(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.userUri}/me/listed/${id}`);
  }

  public patchWatchedMessage(id: string, message: string): Observable<void> {
    const formData = new FormData();
    formData.append('movieId', id);
    formData.append('message', message);
    return this.httpClient.patch<void>(`${environment.userUri}/me/watched`, formData);
  }

  public patchWatchedScore(id: string, score: number): Observable<void> {
    const formData = new FormData();
    formData.append('movieId', id);
    formData.append('score', score.toString());
    return this.httpClient.patch<void>(`${environment.userUri}/me/watched`, formData);
  }

  public patchWatched(id: string, score: number, message: string): Observable<void> {
    const formData = new FormData();
    formData.append('movieId', id);
    formData.append('score', score.toString());
    formData.append('message', message);
    return this.httpClient.patch<void>(`${environment.userUri}/me/watched`, formData);
  }

  public getListedStatus(id: string): Observable<string> {
    return this.httpClient.get<MessageResponse>(`${environment.userUri}/me/listed/${id}`)
      .pipe(map(message => message.message));
  }
}
