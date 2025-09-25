import "./ListMovie.css";
import img_error from "../../assets/error_fetch.png"
import { useEffect, useState } from "react";
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
const [tests,setTests]=useState<ListMovieAllProps[]>([]);
const [topRateds,settopRateds]=useState<ListMovieAllProps[]>([]);
  

useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

const url = "https://api.themoviedb.org/3/"
const allmovie_url =`movie/popular?language=en-US`
const trend_url = `trending/all/day?language=en-US`
const latest_url =`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=1&primary_release_date.lte=2025-09-08&sort_by=primary_release_date.dsc`
const topRated_url = `movie/top_rated?language=en-US&page=1'`

const url_array=[allmovie_url,trend_url,latest_url,topRated_url]

function fetchTmdb (endpoint:string) {
return fetch(url + endpoint, options)
}




    const listMovie =fetchTmdb(url_array[0])
      .then((res) => res.json())
      const trend = fetchTmdb(url_array[1])
.then((res) => res.json());

const latest = fetchTmdb(url_array[2])
.then((res) => res.json());

const topRated = fetchTmdb(url_array[3])
.then((res) => res.json());
Promise.all([listMovie,trend,latest,topRated])
      .then(([data,data2,data3,data4]) => {
        console.log("Résultats API TMDB :", data.results,data2.results,data3.results,data4.results);

        setAllMovies(data.results);
        setTrend(data2.results);
        setTests([data3.results[0]]);
        settopRateds(data4.results);
        console.log("kkkkkkkkkkkkkk",data4)
      })
      .catch((err) => console.error("Erreur API TMDB :", err));
  }, [apiKey]);



  return (
    <div>
        <h1>Films du moment</h1>
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

<h1>Film les mieux notés</h1>
      <ul className="all_div">
        {topRateds.map((toprated) => (
          <li key={toprated.id}>
            <h3>{toprated.title}</h3>
            {/* <p>{trend.overview}</p> */}
            <img
              className="image"
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${toprated.poster_path}`}
              alt={toprated.title}
                       onError={(e) => { e.currentTarget.src = img_error; }}

            />
          </li>
        ))}
      </ul>



<h1>Film populaire à l’affiche</h1>
<ul className="all_div">
  {tests.map((test) => (
    <li key={test.id}>
      <h3>{test.title}</h3>
      <img
        className="image"
        src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${test.poster_path}`|| "probleme"}
        alt={test.title}
         onError={(e) => { e.currentTarget.src = img_error; }}
 
/>
        
        <p>{test.overview}</p>

    </li>
  ))}
</ul>
       

    </div>
  );
}


export default ListMovie;
