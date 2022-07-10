import { useState, useEffect } from 'react';

import {useNavigate, useParams} from 'react-router-dom';
import './Style/MovieView.css';
import Header from './Header';

import Button from 'react-bootstrap/Button';

import {useSelector} from 'react-redux';

function MovieView(props) {
    const params = useParams();
    let navigate = useNavigate();  

    const movieId = params.movieId;
    const movies = useSelector((state) => state.movies);

    let movie = movies.find(movie => movie._id === movieId);

    let director = movie.Director;
    let genre = movie.Genre;

    /**
     * gets all movies made by the current movie's director
     * @returns {array} all director's movies
     */
    function getDirectorMovies() {
        let directorMovies = [];
        movies.forEach(m => {
            if (m.Director.Name === movie.Director.Name) {
                directorMovies.push(m);
            }
        })
        return directorMovies;
    }

    /**
     * gets all movies that match the current movie's genre
     * @returns {array} all movies that match the current movie's genre
     */

    function getGenreMovies() {
        let genreMovies = [];
        movies.forEach(m => {
            if (m.Genre.Title === movie.Genre.Title) {
                genreMovies.push(m);
            }
        })
        return genreMovies;
    }

    const directorMovies = getDirectorMovies();
    const genreMovies = getGenreMovies();   

        return (
            <div>
                <Header applyZIndex='apply-z-index'/>
                    <div className="movie-img-background">
                        <div className="poster-filter"></div>
                        <div className="movie-poster">
                            <img alt="Movie" variant="top" src={"/img/"+movie.ImagePath} />
                        </div>
                    </div>
                    <div className="movie-text-foreground">
                        <div className="movie-title">
                            <p className="value">{ movie.Title }</p>
                        </div>
                        <div className="movie-details">
                            <div className="movie-director info-container">
                                <p className="value">{ movie.Director.Name }</p>
                                <p className="show-more" onClick={() => navigate(`/directors/${movie.Director.Name}`, {state: { director, directorMovies}})}>More Info</p>
                            </div>

                            <div className="movie-genre info-container">
                            
                                <p className="value">{ movie.Genre.Name }</p>
                                <p className="show-more" onClick={() => navigate(`/genres/${movie.Genre.Name}`, {state: {genre, genreMovies}})}>More Info</p>
                            </div>
                            
                            <div className="movie-year ">
                                <p className="value">{ movie.Year }</p>
                            </div>

                            <div className="movie-description">
                                <p className="value">{ movie.Description }</p>
                            </div>
                        </div>
                        <Button className="back-button" onClick={() => navigate("/browse")}>View Movies</Button>
                    </div>
                    

                </div>
        );
    
}

export default MovieView;