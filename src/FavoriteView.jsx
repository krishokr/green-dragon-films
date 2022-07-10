import React, {useEffect, useState} from 'react';
import Header from './Header';
import './Style/MainView.css';

import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { setMovies} from './actions/actions';
import './Style/FavoriteView.css';

import {useSelector, useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';

import {useNavigate} from 'react-router-dom';
import MovieCard from './MovieCard';


export default function FavoriteView() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const setmovies = bindActionCreators(setMovies, dispatch);

    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);

    const [validUser, setvalidUser] = useState(localStorage.getItem("token"));
    const [username, setusername] = useState(user.Username);

    const [favoriteMovies, setfavoriteMovies] = useState([])

    let icon = "";

    /**
     * gets favorite movie objects from movies state and adds them to the state variable
     * @returns {setState} sets favoriteMovies state with favorite movies 
     */

    function getFavoriteMovies() {
        let movieObjects = [];
  
        user.FavoriteMovies.forEach(id=> {
            const mm = movies.find(m => m._id === id);
            movieObjects.push(mm);
        })

        return setfavoriteMovies(movieObjects)
    }

    

    console.log(favoriteMovies)
    useEffect(() => {
        getFavoriteMovies();
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            axios.get('https://greendragonflix.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${accessToken}`}
            })
            .then(response => {
                let data = response.data;
                setmovies(data);
            })
        }
    },[]);

    /**
     * maps favorite movies to a component to display
     * @returns {array} maps each movie card component to each favorite movie object
     */

    function mapFavoriteMovies() {
        if (favoriteMovies.length === 0) {
            return 'You have not selected any favorite movies.'
        }
        return favoriteMovies.map(m => <MovieCard movie={m} key={m._id}/>)
    }
    
    /**
     * if there are no movies, returns only the header component
     */

    if (movies.length === 0) {
        return <Header icon={icon}/>
    }

    /**
     * if there's a valid user, returns all favorite movies
     * @returns {component} displaying all the user's favorite movies
     */

    if (validUser) {
        return (
            <div className="outer-container">
                <div className="mv-header-container"><Header className="header" icon={icon}/></div>
                <div className='favorite-container'>
                    <p>The best of the best. Your classics.</p>
                    <Row className='movies-container'>
                        {mapFavoriteMovies()}                   
                    </Row>
                </div>
            </div>
        )
    }
    return navigate('/login');
}

