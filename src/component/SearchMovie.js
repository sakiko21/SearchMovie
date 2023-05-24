import React, {useState, useEffect, useCallback} from 'react';
import { Link } from "react-router-dom";
import './SearchMovie.css';
export default function SearchMovie(){

    const [movies, setMovies] = useState([]);
    const [keyword, setKeyword] =useState("");
    const [error, setError] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [detail, setDetail] = useState("null");
   const [detailCast, setDetailCast] = useState("null");
   const [modalContent, setModalContent] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
    

    //映画情報の検索
    const getMovies = useCallback(() => {  
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2d251f526c17be62ed7f8c76426218f0&query=${keyword}&page=${pageNumber}&language=ja-JP`)
          .then(response => response.json())
          .then(json => {
            if (json.results && json.results.length >0) {
            setMovies(json.results);
            setError("");
            } else{
            setMovies([]);
            setError("該当する映画がありません。");
          }
        })
          .catch(error => console.log(error));
    }, [keyword, pageNumber]);
    
    useEffect(() => {
        getMovies();
    },[getMovies]);

    function putSearchButton(event) {
        if (event.key === 'Enter'){
            getMovies();
        }
    }
    
    function showModal(content){
        setModalVisible(true);
        setModalContent(content);
        getDetail(content.id);
        getDetailCast(content.id);
      }
   function closeModal(){
    setModalVisible(false);
   }


   function getDetail(id){
       fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d251f526c17be62ed7f8c76426218f0&language=ja-JP`)
       .then(response => response.json())
       .then(response => {
           console.log(response);
           setDetail(response);
       })
       .catch(err => console.error(err));
  }
  function getDetailCast(id){
       fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2d251f526c17be62ed7f8c76426218f0&language=ja-JP`)
       .then(response => response.json())
       .then(response => {
           console.log(response);
           setDetailCast(response);
       })
       .catch(err => console.error(err));
  }



    useEffect(()=> {
        getMovies();  
    }, [getMovies, pageNumber]);
    
    
    return (
        <>     
            <div className="container">
                <div className="head">
                    <h2 className="title">映画検索アプリ</h2>
                    <input 
                        className="input-keyword" 
                        placeholder="キーワードを入力してください"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        onKeyDown={putSearchButton}
                         />
                    <button onClick={getMovies}>検索</button>
                </div>
                <div className="content">
                    {error ? (<p>{error}</p>) : (
                    <ul className="movie-cards">
                        {movies.map(movie =>(
                        <li className="movie-card" key={movie.id} onClick={() => {showModal(movie);getDetail(movie.id);}
                        }>
                            <img 
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <strong>{movie.title}</strong>
                            <p>リリース：{movie.release_date.slice(0,4)}年</p>
                            <p>評価：{movie.vote_average.toFixed(1)}</p>
                            <p>{movie.overview.substring(0,60)}...</p>
                        </li>
                        ))}
                    </ul>
                    )}
                    <div className="pagination">
                        {pageNumber >1 && <button onClick={() => setPageNumber(pageNumber - 1)}>前へ </button>}
                        <button onClick={() => setPageNumber(pageNumber + 1)}>次へ </button>
                    </div>
                </div>
            </div>
            {modalVisible && (
                 <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>×</button>
                        <div className="modal-left">
                            <img 
                                src={`https://image.tmdb.org/t/p/w200/${modalContent.poster_path}`}
                                alt={modalContent.title}
                            />
                        </div>
                        <div className='modal-right'>
                            <p>上映時間：{detail.runtime}分</p>
                            <p>キャスト：{detailCast.cast && detailCast.cast.map (cast => cast.name).join(',')}</p>
                            <p>公式サイトURL：{detail.homepage}</p>
                            <p>ジャンル：{detail.genres && detail.genres.map(genre => genre.name).join(',')}</p>
                        </div>
                    </div>
                </div>
            )}
            <br />
            <Link to ={"/"}>トップへ戻る</Link>
        </>
    );
}