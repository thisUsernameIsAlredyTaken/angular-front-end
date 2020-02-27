import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {TokenResponse} from '../model/token-response';
import {Observable} from 'rxjs';
import * as bcrypt from 'bcryptjs';
import {MessageResponse} from '../model/message-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: boolean;

  constructor(
    private httpClient: HttpClient
  ) {
    this.isAuth = localStorage.getItem('access_token') !== null;
  }

  public login(username: string, password: string): Observable<TokenResponse> {
    const formData = new FormData();
    formData.append('client_id', environment.clientId);
    formData.append('client_secret', environment.clientSecret);
    formData.append('grant_type', 'password');
    formData.append('scope', 'any');
    formData.append('username', username);
    formData.append('password', password);

    return this.httpClient.post<TokenResponse>(`${environment.userUri}/oauth/token`, formData).pipe(
      map(
        response => {
          this.initLocalStorage(response);
          this.isAuth = true;
          return response;
        }
      )
    );
  }

  public logout(): void {
    this.isAuth = false;
    this.clearLocalStorage();
  }

  public register(username: string, email: string, password: string,
                  firstName: string, lastName: string) {
    this.clearLocalStorage();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('passwordHash', this.encodePassword(password));
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    return this.httpClient.post<MessageResponse>(`${environment.userUri}/user/register`, formData);
  }

  private initLocalStorage(response: TokenResponse): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('expires', (Math.floor(Date.now() / 1000) + response.expires_in).toString());
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires');
  }

  private encodePassword(password: string): string {
    return bcrypt.hashSync(password, 4);
  }
}
