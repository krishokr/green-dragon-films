import React, {useEffect, useState} from 'react';
import Header from './Header';
import './Style/MainView.css';

import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { setMovies} from './actions/actions';
import MoviesList from './MoviesList';

import {useSelector, useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';

import {useNavigate} from 'react-router-dom';
import MovieCard from './MovieCard';

function MainView(props) {
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const setmovies = bindActionCreators(setMovies, dispatch);

    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);

    const [validUser, setvalidUser] = useState(localStorage.getItem("token"));
    const [username, setusername] = useState(user.Username);
    const [featuredMovies, setfeaturedMovies] = useState([]);

    let icon = "";


    useEffect(() => {
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

    
    // function getAllDirectors() {
    //     const unique = [...new Set(movies.map(movie => movie.Director))];
    //     return unique
    // }
    // // console.log(getAllDirectors());

    /**
     * returns all featured movies
     * @returns {array} all featured movies
     */
    function getFeaturedMovies() {
        let collectM = movies.filter(m => m.Featured === true);
        return collectM
    }


    if (movies.length === 0) {
        return <Header icon={icon}/>
    }


    if (validUser && movies.length > 0) {
        return (
            <div className="main-view-container">
                <Header className="header" icon={icon}/>
                <div className='featured-container'>
                    <p className="container-title">Featured</p>
                    <Row className="featured-movies">
                        {getFeaturedMovies().map(m => <MovieCard key={m._id} movie={m} />)}
                    </Row>
                </div>
              
                <div className="genre-container categories">
                    <p className="container-title">Movies By Genre</p>
                    <div className="genre-box-container">
                        <div onClick={() => navigate("/genres/Fantasy")} className="genre-box fantasy-display">
                            <p>Fantasy</p>
                        </div>
                        <div onClick={() => navigate("/genres/Espionage")}className="genre-box espionage-display">
                            <p>Espionage</p>
                        </div>
                        <div onClick={() => navigate("/genres/Science Fiction")}className="genre-box scifi-display">
                            <p>Space</p>
                        </div>
                    </div>
                </div>

                {/* <div className="director-container categories">
                    <p>Movies By Director</p>
                    <div className="director-box-container">
                        {}
                    </div>
                </div> */}
                   
                    {/* {movies.map(m => <MovieCard movie={m} />)}                  */}
              
            </div>
        )
    }
    return navigate('/login');
}

export default MainView;
