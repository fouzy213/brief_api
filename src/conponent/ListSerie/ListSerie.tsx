import { useEffect, useState } from "react";
import "./ListSerie.css";
interface ListMovieAllProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function ListMSerie() {
  const apiKey = import.meta.env.VITE_CLIENT_API_KEY;
  const [allmovies, setAllMovies] = useState<ListMovieAllProps[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Résultats API TMDB :", data.results);
        setAllMovies(data.results);
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, [apiKey]);

  return (
    <div>
      <ul>
            <h1>Films les plus populaires</h1>
        <div className="all_div">
        {allmovies.map((allmovie) => (
          <li key={allmovie.id}>
            <h3>{allmovie.title}</h3>
            {/* <p>{allmovie.overview}</p> */}
            <img
              className="image"
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${allmovie.poster_path}`}
              alt={allmovie.title}
            />
          </li>
         
        ))}
        </div>
       </ul>
    </div>
  );
}

export default ListMSerie;
