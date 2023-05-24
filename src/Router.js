import {Routes, Route} from 'react-router-dom';
import {Top, About, MovieList, SearchMovie} from './component'
import { MovieDetail } from './component/MovieDetail';

export function Router (){
    return(
        <Routes>
            <Route path="/" element={<Top/>}/>
            <Route path="/" element={<About/>}/>
            <Route path="/search" element={<SearchMovie />}/>
            <Route path="/movie/list" element={<MovieList/>}/>
            < Route path="/movie/:id" element={<MovieDetail/>}/>
        </Routes>
    );
}