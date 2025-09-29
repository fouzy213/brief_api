import { useParams } from "react-router-dom";
import useFetch from "../../hook/usefetch";
import { useEffect, useState } from "react";
import img_error from "../../assets/error_fetch.png";
import "./SerieById.scss"
interface SerieByIDProps {
  id: number;
  title?: string;
  name: string;
  poster_path: string;
  overview: string;
}
function SerieById() {
  const { id } = useParams<{ id: string }>();
  const fetchTmdb = useFetch();
  const [serieById, setSerieById] = useState<SerieByIDProps | null>(null);
  useEffect(() => {
    const idmovie = `tv/${id}?language=fr-FR`;

    fetchTmdb(idmovie)
      .then((res) => res.json())
      .then((data) => {
        console.log("Film ffffffffffffff:", data);
        setSerieById(data);
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, []);
  return (
    <div className="movie-card">
      <h2>{serieById?.title ?? serieById?.name}</h2>
      <p>{serieById?.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${serieById?.poster_path}`}
        alt={serieById?.title ?? serieById?.name}
        onError={(e) => {
          e.currentTarget.src = img_error;
        }}
      />
    </div>
  );
}

export default SerieById;
