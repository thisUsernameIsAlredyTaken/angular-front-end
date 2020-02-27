import {Movie} from './movie';

export interface WatchedMovie extends Movie {

  user_score?: number;
  user_message: string;
  add_date: Date;
}
