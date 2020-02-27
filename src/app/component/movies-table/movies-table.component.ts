import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss']
})
export class MoviesTableComponent implements OnInit {

  @Input()
  public rows = 2;
  @Input()
  public cols = 6;

  public rowsRange: number[];
  public colsRange: number[];

  @Input()
  public movies: Movie[] = [];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data.rows) {
        this.rows = data.rows;
      }
      if (data.cols) {
        this.cols = data.cols;
      }
      this.rowsRange = Array.from(Array(this.rows).keys());
      this.colsRange = Array.from(Array(this.cols).keys());
    });
  }

}
