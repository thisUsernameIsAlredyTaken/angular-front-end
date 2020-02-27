import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  public logOut() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
