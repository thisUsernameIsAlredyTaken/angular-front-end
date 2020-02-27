import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../model/user-info';
import {UserService} from '../../service/user.service';
import {environment} from '../../../environments/environment';

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
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
    });
    this.userService.getPlannedCount().subscribe(value => this.plannedCount = value);
    this.userService.getWatchedCount().subscribe(value => this.watchedCount = value);
  }

}
