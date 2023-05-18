import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, {useState, useEffect, createContext, useContext} from 'react';

export const ModalContext = createContext();

export default function SearchMovie(){

    const [movies, setMovies] = useState([]);
    const [keyword, setKeyword] =useState("");
    const [error, setError] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState();

    function getMovies() {
        const apiKey = "2d251f526c17be62ed7f8c76426218f0";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${pageNumber}&language=ja-JP`;
        fetch(url)
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
        setModalContent(content);
        setModalVisible(true);
    }
   function closeModal(){
    setModalVisible(false);
   }

    useEffect(()=> {
        getMovies();  
    }, [pageNumber]);
    

    return (
    <>
        <ModalContext.Provider value={{ modalVisible, showModal, closeModal }}>
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
                        <li className="movie-card" key={movie.id} onClick={() => showModal(movie)}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <strong>{movie.title}</strong>
                            <p>{movie.overview}</p>
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
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>×</button>
                <div className="modal-left">
                    <img 
                        src={`https://image.tmdb.org/t/p/w200/${modalContent.poster_path}`}
                        alt={modalContent.title}
                    />
                </div>
                <div className='modal-right'>
                    <p>リリース時期：{modalContent.release_date}</p>               
                    <p>評価：{modalContent.vote_average}</p>
                </div>
            </div>
            
            }
            
            
        </ModalContext.Provider>
    </>
    );
}