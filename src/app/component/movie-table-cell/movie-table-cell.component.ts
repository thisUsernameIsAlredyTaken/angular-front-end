import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {WatchedMovie} from '../../model/watched-movie';
import {PlannedMovie} from '../../model/planned-movie';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-movie-table-cell',
  templateUrl: './movie-table-cell.component.html',
  styleUrls: ['./movie-table-cell.component.scss']
})
export class MovieTableCellComponent implements OnInit {

  @Input()
  public movie: Movie;

  public fallbackImg = 'assets/image/404.png';

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
