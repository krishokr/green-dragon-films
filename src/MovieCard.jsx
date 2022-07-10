import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import './Style/MovieCard.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setUser } from './actions/actions';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MovieCard(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const setuser = bindActionCreators(setUser, dispatch);
    const user = useSelector((state) => state.user);
    const [movie, setmovie] = useState(props.movie);
    const [view, setview] = useState('');


    /**
     * returns either a check or heart icon component based on if the movie is favorited
     * @returns {component} 
     */

    function getIcon() {
        let favoriteMovies = user.FavoriteMovies;
        if (favoriteMovies.indexOf(movie._id) > -1) {
            console.log('contains: ' + movie.Title);
            return <FontAwesomeIcon onClick={() => deleteMovie()} icon='fa-solid fa-check' />
        }
        return <FontAwesomeIcon onClick={() => addMovie()} icon='fa-solid fa-heart' />
    }

    /**
     * deletes movie stored in state and updates user state favorites
     * uses axios to delete movie from API
     */

    function deleteMovie() {
        let token = localStorage.getItem("token");

        let favoriteMovies = user.FavoriteMovies.filter(id => movie._id !== id);

        axios.delete(`https://greendragonflix.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, movie._id).then(
            response => {
                console.log(response);
                setuser({...user, FavoriteMovies: favoriteMovies});
            }
        ).catch(error => console.log(error))
    }
    
    /**
     * returns a boolean if the id exists in the user favorite movies
     * @param {string} id 
     * @returns {boolean} true if movie is a duplicate
     */

    function duplicateFavoriteMovie(id) {
        if (user.FavoriteMovies.includes(id)) {
            return true;
        }
        return false
    }

    /**
     * posts new favorite movie to API then updates user favorite movies
     * @param {string} id 
     */

    function postFavoriteMovie(id) {
        let accessToken = localStorage.getItem("token");
        let favoriteMovies = [...user.FavoriteMovies, id];

        axios.post(`https://greendragonflix.herokuapp.com/users/${user.Username}/movies/${id}`, id, {
            headers: { 
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            console.log('movie has been added');
            setuser({...user, FavoriteMovies: favoriteMovies});
        }).catch(error => console.log(error))
    }

    /**
     * checks to see if movie is a duplicate then calls post movie function to add movie to favorites
     * @returns {function} calls post function if movie being added is not a duplicate
     */

    function addMovie() {

        if (!duplicateFavoriteMovie(movie._id)) {
            return postFavoriteMovie(movie._id);
        }
        return console.log('something went wrong...');
    }

    /**
     * if cursor hovers over a card, it displays options such as add/delete movie from favorites and view details about a movie
     * @returns {component} display when cursor hovers over a card
     */

    if (view === 'hover') {
        return <Col md={4} sm={6} className="mouse-leave-transition" onMouseLeave={() => setview('')}>

        <Card className="movie-card">

            <div className='background'>
                <img alt="Movie" variant="top" src={"/img/"+movie.ImagePath} />
            </div>

            <div className='foreground'>
                <div className="card-body">
                    <h1>{movie.Title}</h1>
                    <div className="button-center">
                        <FontAwesomeIcon onClick={() =>  navigate(`/browse/${movie._id}`)}icon="fa-solid fa-circle-info" />
                        {getIcon()}
                    </div>
                </div>
            </div>
        </Card>
    </Col>
    }

    /**
     * display when cursor is not hovered over a card
     * @returns {component} display of movie image
     */

    return(
        <Col md={4} sm={6}  onMouseEnter={() => setview('hover')}>
            <Card className="movie-card">
                <Card.Img variant="top" src={"/img/" + movie.ImagePath} />
            </Card>
        </Col>
    )
}

export default MovieCard;