import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './MovieDetail.css';

export function MovieDetail(){
    const { id } = useParams();
    const [movie, setMovie] = useState({});//映画情報を格納する配列
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d251f526c17be62ed7f8c76426218f0&language=ja-JP`)
            .then(response => response.json())
            .then(data => setMovie(data));
    }, [])

    return(
        <>
        <div className="movie-detail-container">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <br /> 
        </div>
        <br />
        <Link to={"/movie/list"}>戻る</Link>  
        </>
    );
}