import img_error from "../../assets/error_fetch.png";
import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";
import "./ListSerie.scss";
import { Link } from "react-router-dom";
import type { GenreProps, GenreWithSeries } from "../type";

function ListSerie() {
  const fetchTmdb = useFetch();
  const [genreSeries, setGenreSeries] = useState<GenreWithSeries[]>([]);

  useEffect(() => {
    const genre_url = `genre/tv/list?language=fr-FR`;

    fetchTmdb(genre_url)
      .then((res) => res.json())
      .then((data) => {
        const selectedGenres = data.genres.slice(0, 5);

        Promise.all(
          selectedGenres.map((genre: GenreProps) =>
            fetchTmdb(`discover/tv?with_genres=${genre.id}&language=fr-FR`)
              .then((res) => res.json())
              .then((data) => ({
                genre,
                series: data.results,
              }))
          )
        ).then((all) => setGenreSeries(all));
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, []);

  return (
    <div className="carroussel">
      {genreSeries.map((genreSerie) => (
        <div key={genreSerie.genre.id}>
          <h2>{genreSerie.genre.name}</h2>
          <ul className="all_div">
            {genreSerie.series.map((serie) => (
              <li key={serie.id}>
                <Link to={`/serie/${serie.id}`}>
                  <img
                    className="image"
                    src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${serie.poster_path}`}
                    alt={serie.name}
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

export default ListSerie;
