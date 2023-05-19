import React, {useState, useEffect, createContext, useContext} from 'react';
import ModalContent from './ModalContent.js';
export const ModalContext = createContext();
//export const ModalContext = createContext({ modalVisible: false, showModal: () => {}, closeModal: () => {} });



export default function SearchMovie(){

    const [movies, setMovies] = useState([]);
    const [keyword, setKeyword] =useState("");
    const [error, setError] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [detail, setDetail] = useState("null");
    const [detailCast, setDetailCast] = useState("null");

    function getMovies() {  
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2d251f526c17be62ed7f8c76426218f0&query=${keyword}&page=${pageNumber}&language=ja-JP`)
          .then(response => response.json())
          .then(json => {
            if (json.results && json.results.length >0) {
            setMovies(json.results);
            setError("");
            } else{
            setMovies(null);
            setError("該当する映画がありません。");
          }
        })
          .catch(error => console.log(error));
    }
    function changeKeyword(event){
        setKeyword(event.target.value);
    }
    function searchKeyword(){
        getMovies();
    }
    function putSearchButton(event)  {
        if (event.key === 'Enter'){
            getMovies();
        }
        
    }
    function showModal(content){
        console.log('showModal called with content:', content);
        setModalContent(content);
        setModalVisible(true);
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
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d251f526c17be62ed7f8c76426218f0/credits?language=ja-JP`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setDetailCast(response);
        })
        .catch(err => console.error(err));
   }


    useEffect(()=> {
        getMovies();  
    }, [pageNumber]);
    
    useEffect(() => {
        if (modalContent) {
            setModalVisible(true);
        }
    }, [modalContent]);

    return (
    <>
        <ModalContext.Provider value={{ modalVisible, showModal, closeModal, modalContent, detail,detailCast}}>
            <div className="container">
                <div className="head">
                    <h2 className="title">映画検索アプリ</h2>
                    <input 
                        className="input-keyword" 
                        placeholder="キーワードを入力してください"
                        value={keyword}
                        onChange={changeKeyword}
                        onKeyDown={putSearchButton}
                         />
                    <button onClick={searchKeyword}>検索
                    </button>
                </div>
                <div className="content">
                    {error ? (<p>{error}</p>) : (
                    <ul className="movie-cards">
                        {Array.isArray(movies) && movies.map(movie =>(
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
            
                {modalVisible && 
                    <ModalContent />
                }
        </ModalContext.Provider>
    </>
    );
}