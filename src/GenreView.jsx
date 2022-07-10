import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import './Style/GenreView.css';
import MovieCard from './MovieCard';

import Header from './Header';

function GenreView(props) {
    let navigate = useNavigate();
    let params = useParams();
    
    const genreName = params.genreName;

    const movies = useSelector((state) => state.movies);

    const [genre, setgenre] = useState({});
    const [genreMovies, setgenreMovies] = useState([])
    

    useEffect(() => {
        getGenre();
        getGenreMovies();
    },[])

    /**
     * gets and sets the genre state with the genre object from movies
     */
    function getGenre() {
        let genreObj = movies.find(movie => movie.Genre.Name === genreName);
        setgenre(genreObj.Genre);
    }

    /**
     * gets and sets all movies with specified genre
     * @returns {setState} sets genreMovies state with all movies with specified genre
     */

    function getGenreMovies() {
        let collectM = movies.filter(movie => movie.Genre.Name === genreName);
        return setgenreMovies(collectM);
    }

    return <div>
     
                <Header applyZIndex='apply-z-index'/>

            <div className="genre-details-container">
                <div>
                    <h1 className="name">{genreName}</h1>
                    <p className="genre-description">{genre.Description}</p>
                </div>
                <div className="movies-container">
                    <h3>Movies: </h3>
                    <div className='movie-cards'>
                        {genreMovies.map(movie => <MovieCard className="card" movie={movie} key={movie._id}/>)}
                    </div>
                </div>
                <button className="view-movie-button" onClick={() => navigate(-1)}>View Movies</button>
            </div>
        </div>
}

export default GenreView;