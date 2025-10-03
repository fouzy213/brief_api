import { useParams } from "react-router-dom";
import useFetch from "../../hook/usefetch";
import { useEffect, useState } from "react";
import img_error from "../../assets/error_fetch.png";
import "./CardId.scss";
import type { MediaByIDProps, MediaByIdPropsType } from "./../type";

function CardId({ type }: MediaByIdPropsType) {
  const { id } = useParams<{ id: string }>();
  const fetchTmdb = useFetch();
  const [media, setMedia] = useState<MediaByIDProps | null>(null);

  useEffect(() => {
    if (!id) return;

    const url = `${type}/${id}?language=fr-FR`;

    fetchTmdb(url)
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, [id, type]);

  return (
    <div className="all_card_id">
      {media && (
        <div className="movie-card">
          <h2>{media.title ?? media.name}</h2>
          <p>{media.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${media.poster_path}`}
            alt={media.title ?? media.name}
            onError={(e) => {
              e.currentTarget.src = img_error;
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CardId;
