import "./ListMoviesCategories.scss";
import img_error from "../../assets/error_fetch.png";
import useFetch from "../../hook/usefetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { GenreProps, GenreWithMovies } from "../type";

function ListMoviesCategories() {
  const fetchTmdb = useFetch();
  const [genreMovies, setGenreMovies] = useState<GenreWithMovies[]>([]);

  useEffect(() => {
    const url_genreMovie = `genre/movie/list?language=en`;

    fetchTmdb(url_genreMovie)
      .then((res) => res.json())
      .then((data) => {
        const selectedGenres = data.genres.slice(0, 5);
        Promise.all(
          selectedGenres.map((genre: GenreProps) =>
            fetchTmdb(`discover/movie?with_genres=${genre.id}&language=fr-FR`)
              .then((res) => res.json())
              .then((data) => ({
                genre,
                movies: data.results,
              }))
          )
        ).then((all) => setGenreMovies(all));
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, []);

  return (
    <div className="carroussel">
      {genreMovies.map((genreMovie) => (
        <div key={genreMovie.genre.id}>
          <h2>{genreMovie.genre.name}</h2>
          <ul className="all_div">
            {genreMovie.movies.map((movie) => (
              <li key={movie.id}>
                <p>{movie.name}</p>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="image"
                    src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                    alt={movie.name}
                    onError={(e) => {
                      e.currentTarget.src = img_error;
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListMoviesCategories;
