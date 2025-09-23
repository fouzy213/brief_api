import { useEffect, useState } from "react";
import "./ListMovie.css";
interface ListMovieAllProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

function ListMovie() {
  const apiKey = import.meta.env.VITE_CLIENT_API_KEY;
  const [allmovies, setAllMovies] = useState<ListMovieAllProps[]>([]);
   const [trends, setTrend] = useState<ListMovieAllProps[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const listMovie =fetch( "https://api.themoviedb.org/3/movie/popular?language=en-US", options)
      .then((res) => res.json())
      const trend = fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US",options)
.then((res) => res.json());



Promise.all([listMovie,trend])
      .then(([data,data2]) => {
        console.log("Résultats API TMDB :", data.results,data2.results);
        setAllMovies(data.results);
        setTrend(data2.results);
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, [apiKey]);

  return (
    <div>
        <h1>FIlms du moment</h1>
   <ul className="all_div">
  {allmovies.map((allmovie) => (
    <li key={allmovie.id}>
      <h3>{allmovie.title}</h3>
      <img
        className="image"
        src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${allmovie.poster_path}`}
        alt={allmovie.title}
      />
    </li>
  ))}
  </ul>

<h1>Tendances actuelles</h1>
      <ul className="all_div">
        {trends.map((trend) => (
          <li key={trend.id}>
            <h3>{trend.title}</h3>
            {/* <p>{trend.overview}</p> */}
            <img
              className="image"
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${trend.poster_path}`}
              alt={trend.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ListMovie;
