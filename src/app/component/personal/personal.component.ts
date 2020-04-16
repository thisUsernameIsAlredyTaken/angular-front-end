import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../model/user-info';
import {UserService} from '../../service/user.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../service/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public fallbackImg = environment.fallbackImg;
  public userInfo: UserInfo;
  public watchedCount: number;
  public plannedCount: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuth) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.userService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
    });
    this.userService.getPlannedCount().subscribe(value => this.plannedCount = value);
    this.userService.getWatchedCount().subscribe(value => this.watchedCount = value);
  }

}
