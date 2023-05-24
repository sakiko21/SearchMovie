import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import './MovieList.css';

export function MovieList () {
    
    const [movies, setMovies] = useState([]); //映画情報を格納する配列

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=2d251f526c17be62ed7f8c76426218f0&language=ja-JP&page=1')
            .then(response => response.json())
            .then(data => setMovies(data.results));
    })

    return(
        <div>
            <h1>人気映画一覧</h1>
            <ul className="movie-list-ul">
                {movies.map(({ id, title}) => (
                    <li key={id} style={{listStyle:"none"}}>
                        <Link to={`/movie/${id}`}>
                            {title}
                        </Link>                  
                    </li>
                ))}
                
            </ul>
            <br />
            <Link to ={"/"}>トップへ戻る</Link>
        </div>
    );
}