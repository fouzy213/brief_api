export interface MediaByIDProps {
  id: number;
  title?: string;
  name: string;
  poster_path: string;
  overview: string;
}

export interface MediaByIdPropsType {
  type?: "movie" | "tv";
}

export interface ListMovieAllProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface ListSerieAllProps {
  id: number;
  title?: string;
  name: string;
  poster_path: string;
  overview: string;
}

export interface GenreProps {
  id: number;
  name: string;
}

export interface GenreWithMovies {
  genre: GenreProps;
  movies: ListSerieAllProps[];
}

export interface ListSerieAllProps {
  id: number;
  title?: string;
  name: string;
  poster_path: string;
  overview: string;
}

export interface GenreWithSeries {
  genre: GenreProps;
  series: ListSerieAllProps[];
}
