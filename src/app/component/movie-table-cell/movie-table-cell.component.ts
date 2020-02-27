import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';

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
