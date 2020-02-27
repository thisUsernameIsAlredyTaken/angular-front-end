export interface Movie {

  id: string;
  title: string;
  type: string;
  description: string;
  genres: string;
  start_year: number;
  end_year?: number;
  runtime: number;
  rating: number;
  popularity: number;
  pic_uri: string;
  listed?: string;
  user_score?: number;
  user_message?: string;
  add_date?: Date;
}
