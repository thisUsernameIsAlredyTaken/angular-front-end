import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username = '';
  public password = '';
  public email = '';
  public firstName = '';
  public lastName = '';
  public usernameStatus: string;
  public emailStatus: string;
  public passwordStatus: string;
  public isReg = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const emailError = params.get('email_error');
      const usernameError = params.get('username_error');
      if (emailError) {
        this.emailStatus = 'error';
      }
      if (usernameError) {
        this.usernameStatus = 'error';
      }
    });
  }

  public register(): void {
    this.isReg = true;
    this.usernameStatus = '';
    this.passwordStatus = '';
    this.emailStatus = '';
    this.authService.register(this.username, this.email, this.password,
      this.firstName, this.lastName).subscribe(
      (value) => {
        this.router.navigateByUrl('/login');
      }, (value) => {
        if (value instanceof HttpErrorResponse) {
          if (value.error.message.startsWith('User')) {
            this.usernameStatus = 'error';
          }
          if (value.error.message.startsWith('E-mail')) {
            this.emailStatus = 'error';
          }
          if (value.error.message1) {
            if (value.error.message1.startsWith('User')) {
              this.usernameStatus = 'error';
            }
            if (value.error.message1.startsWith('E-mail')) {
              this.emailStatus = 'error';
            }
          }
        }
        this.isReg = false;
      });
  }
}
