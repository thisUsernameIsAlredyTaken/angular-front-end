import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public status = '';
  public isLog = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const error = params.get('error');
      if (error) {
        this.status = 'error';
      }
    });
  }

  public login(): void {
    this.isLog = true;
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigateByUrl(`${environment.navigateAfterLogin}`);
      }, () => {
        this.status = 'error';
        this.isLog = false;
      });
  }
}
