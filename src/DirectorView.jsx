import React, {useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router';
import Header from './Header';
import './Style/DirectorView.css';
import {useSelector} from 'react-redux';
import MovieCard from './MovieCard';


function DirectorView(props) {
    let navigate = useNavigate();

    const params = useParams();
    const directorName = params.directorName;

    const movies = useSelector((state) => state.movies);

    const [director, setdirector] = useState({});
    const [directorMovies, setdirectorMovies] = useState([]);

    useEffect(() => {
        getDirector();
        getDirectorMovies();
    },[])


    /**
     * gets the director object
     * @returns {state} stores the director object
     */
    function getDirector() {
        let movie = movies.find(movie => movie.Director.Name === directorName);
        return setdirector(movie.Director);
    }
    
    /**
     * gets director movies from all movies
     * @returns {state} sets directorMovies state with director movies
     */
    function getDirectorMovies() {
        let directorM = movies.filter(movie => movie.Director.Name === directorName);
        console.log(directorM);
        return setdirectorMovies(directorM);
    }

    /**
     * @returns {component} displays information about director with recommended movies
     */

    return (    
        <div>
            <Header applyZIndex='apply-z-index'/>
            <div className='details-container'>

                <div>
                    <h1 className="name">{director.Name}</h1>
                    <h2 className="birthday">{director.Birth}</h2>
                    <h2 className="bio">{director.Bio}</h2>
                </div>

                <div className="movies-container">
                    <h3>Tales By {director.Name}: </h3>
                    <div className="movie-cards">
                        {directorMovies.map(movie => <MovieCard movie={movie} key={movie._id + movie.Title}/>)}
                    </div>
                </div>
                <button className="view-movie-button" onClick={() => navigate(-1)}>View Movie</button>

            </div>
        </div>
    );
}

export default DirectorView;