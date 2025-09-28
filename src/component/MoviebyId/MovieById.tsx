import img_error from "../../assets/error_fetch.png";
import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";
import { useParams } from "react-router-dom";
import "./MovieById.css"

interface MovieByIDProps {
  id: number;
  title?: string;
  name: string;
  poster_path: string;
  overview: string;
}

function MovieById(){
    const { id } = useParams<{ id: string }>();
    const fetchTmdb = useFetch();
const [movieByID, setMovieById] = useState<MovieByIDProps | null>(null);
   
   
    useEffect(() => {
       const idmovie = `movie/${id}?language=fr-FR`;
   
   fetchTmdb(idmovie)
      .then((res) => res.json())
      .then((data) => {
   console.log("Film ffffffffffffff:", data);
    setMovieById(data);

    })
    .catch((err) => console.error("Erreur API TMDB :", err));
}, []);


   
    return(
       <div className="movie-card">
      <h2>{movieByID?.title ?? movieByID?.name}</h2>
      <p>{movieByID?.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieByID?.poster_path}`}
        alt={movieByID?.title ?? movieByID?.name}
             onError={(e) => {
                e.currentTarget.src = img_error;
              }}
      />
    </div>
  );
}

export default MovieById