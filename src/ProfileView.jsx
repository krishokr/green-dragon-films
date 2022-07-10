import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Style/ProfileView.css';
import Header from './Header';

import { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from './actions/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfileView(props) {
    let navigate = useNavigate();

    const [allUsers, setallUsers] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [birthday, setbirthday] = useState('');
    const [icon, seticon] = useState("");
    const [view, setview] = useState('');
    const [passwordGuess, setpasswordGuess] = useState("");
    const [error, seterror] = useState('');
    const [titleToAdd, settitleToAdd] = useState('');
    const [addMovieMsg, setaddMovieMsg] = useState('');
    const [deleteMovieMsg, setdeleteMovieMsg] = useState('')
    const [updateStatus, setupdateStatus] = useState('');
    const [loading, setloading] = useState('');
    const [favoriteMovies, setfavoriteMovies] = useState([]);

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);

    const setuser = bindActionCreators(setUser, dispatch);


    useEffect(() => {
        setemail(user.Email);
        setbirthday(user.Birthday);
        setusername(user.Username);            
        // setpassword(user.Password);
        getFavoriteMovies()
    },[]);

    console.log('password' + user.Password);

    /**
     * gets all the user's favorite movies
     * @returns {setState}
     */
    function getFavoriteMovies() {
        let movieObjects = [];
  
        user.FavoriteMovies.forEach(id=> {
            const mm = movies.find(m => m._id === id);
            movieObjects.push(mm);
        })

        return setfavoriteMovies(movieObjects)
    }


    
  
    function passwordCheck() {
        return <Form>
            <Form.Group>
                <Form.Label>Enter your old password: </Form.Label>
                <Form.Control value={passwordGuess} onChange={e => setpasswordGuess(e.target.value)}></Form.Control>
                <p className="errorMessage">{error}</p>
                <Button onClick={validatePasswordChange}>Submit</Button>
            </Form.Group>
        </Form>
    }


    function validatePasswordChange() {
        
        if (passwordGuess === password) {
            return setview('Password')
        }
        return seterror('Your entered password is incorrect.')
    }
   
    /**
     * 
     * @returns {component} form component that lets the user update their password
     */
    function changePasswordView() {
        
            return <div className="change-view">
                
                <Form className="change-view-form">
                <Form.Group >
                    <p className="new-info">This will replace the password you use to log in on Green Dragon Films.</p>
                    <Form.Label>New Password </Form.Label>
                    <Form.Control className="change-view-input" value={password} type="text" onChange={e=> setpassword(e.target.value)}></Form.Control>
                    <Button className="profile-view-button" onClick={handleSave}>Save</Button>
                    <Button className="profile-view-button" onClick={handleCancel}>Cancel</Button>
                </Form.Group>
            </Form>
            </div>
    }

    /**
     * determine if username length is greater than 5 characters
     * @param {string} newUsername 
     * @returns {boolean} whether or not the username is greater than 5 characters
     */

    function checkUsernameLength(newUsername) {
        if (newUsername.length < 5) {
            seterror('Username is less than 5 characters.');
            return false
        }
        return true
    }

    /**
     * updates localStorage with new username
     * @param {string} newUsername 
     * @returns {function} 
     */
    function updateStorage(newUsername) {
        return localStorage.setItem("user", newUsername);
    }

    /**
     * determines if the username is valid and then updates the localStorage using helper functions
     * @param {string} newUsername 
     * @returns {boolean}
     */
    function validUsername(newUsername) {

        checkUsernameLength(newUsername);
        if (!error) {
            updateStorage(newUsername);
            return true
        }
        return false
    }

    /**
     * saves updated user information to the database
     * @returns {setState, boolean} depending on success or fail
     */
    function handleSave() {

        let formData = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday,
            FavoriteMovies: favoriteMovies
        }
        console.log(formData);
       
        if (validUsername(username)) {
            let accessToken = localStorage.getItem("token");
            
            axios.put(`https://greendragonflix.herokuapp.com/users/${user.Username}`, formData, {
                headers: { 
                    Authorization: `Bearer ${accessToken}`}
            }).then(response => {
                console.log(response);
                setuser(formData);

            })
            .catch(error => console.log(error));
       
            setupdateStatus('User information has been updated.');
            return setview('');
        }
        return error
    }

    /**
     * returns the view to profile view
     * @returns {setState}
     */
    function handleCancel() {
        return setview('');
    }

    /**
     * displays UI to change email
     * @returns {component}
     */
    function changeEmailView() {
        return <div className='change-view'>
            <Form className="change-view-form">
                <Form.Group >
                    <p className="new-info">This will replace the email you use on Green Dragon Films.</p>
                    <p className="current-info">Current Email: {user.Email}</p>
                    <Form.Label>New Email </Form.Label>
                    <Form.Control className="change-view-input" value={email} type="text" onChange={e=> setemail(e.target.value)}></Form.Control>
                    <Form.Label>Enter Password: </Form.Label>
                    <Form.Control className="change-view-input" value={password} type="text" onChange={e=> setpassword(e.target.value)}></Form.Control>
                    <Button className="profile-view-button" onClick={handleSave}>Save</Button>
                    <Button className="profile-view-button" onClick={handleCancel}>Cancel</Button>
                </Form.Group>
            </Form>
        </div>
    }

    /**
     * displays UI to change username
     * @returns {component}
     */
    function changeUsernameView() {
        return <div className='change-view'>
                <Form className="change-view-form">
                    <Form.Group >
                        <p className="new-info">This will replace the username you use to log in on Green Dragon Films.</p>
                        <p className="current-info">Current Username: {user.Username}</p>
                        <Form.Label>New Username</Form.Label>
                        <Form.Control className="change-view-input" value={username} type="text" onChange={e=> setusername(e.target.value)}></Form.Control>
                        <Form.Label>Enter Password: </Form.Label>
                        <Form.Control className="change-view-input" value={password} type="text" onChange={e=> setpassword(e.target.value)}></Form.Control>
                        <Button className="profile-view-button" onClick={handleSave}>Save</Button>
                        <Button className="profile-view-button" onClick={handleCancel}>Cancel</Button>
                    </Form.Group>
                </Form>
        </div>
    }

    /**
     * formats an entered birthday from the user
     * @returns {date} 
     */
    function formatBirthday() {
        return new Date(birthday).toLocaleDateString(undefined, {year:"numeric", month:"long", day:"numeric"});
    }

    /**
     * displays UI that allows user to change their birthday
     * @returns {component}
     */
    function changeBirthdayView() {
        return <div className='change-view'>
            
            <Form className="change-view-form change-view-form-birthday">
            <Form.Group >
                <p className="current-info">Current Birthday: {user.Birthday}</p>
                <Form.Label>New Birthday</Form.Label>
                <Form.Control className="change-view-input birthday-input" value={birthday} type="date" onChange={e=> setbirthday(e.target.value)}></Form.Control>
                <Form.Label>Enter Password: </Form.Label>
                <Form.Control className="change-view-input" value={password} type="text" onChange={e=> setpassword(e.target.value)}></Form.Control>
                <Button className="profile-view-button" onClick={handleSave}>Save</Button>
                <Button className="profile-view-button" onClick={handleCancel}>Cancel</Button>
            </Form.Group>
        </Form>
        </div>
    }

    function handleNavigate() {

        navigate("/browse");
    }

    /**
     * displays UI that allows user to add movie to favorites
     * @returns {component}
     */
    function addMovieView() {   
        return <div className="change-view">
            <Form className="change-view-form">
                <Form.Group>
                    <Form.Label>Movie to Add </Form.Label>
                    <Form.Control className="change-view-input" value={titleToAdd} onChange={e => settitleToAdd(e.target.value)}></Form.Control>
                    <p className="errorMessage">{error}</p>
                    <Button onClick={() => addMovie()}>Add Movie</Button>
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                    <p>{addMovieMsg}</p>
                </Form.Group>
            </Form>
    </div>
    }
    
    /**
     * finds the movie the user wants to add or delete
     * @param {string} title 
     * @returns {setState, object} if successful, returns movie object -> if unsuccessful sets the error state
     */
    function findMovie(title) {
        let movieExists = movies.find(m => title === m.Title);

        if (movieExists) {
            return movieExists
        }
        return seterror('Cannot find movie.');
    }

    /**
     * determines if the movie has already been added to the user's favorites
     * @param {object} movie 
     * @returns {boolean}
     */
    function duplicateMovie(movie) {
        seterror('');

        if (!favoriteMovies) {
            console.log('no favorite movies');
            return false;
        }
  
        if (favoriteMovies.includes(movie)) {
           
            seterror('Movie is already a favorite! Please choose another title.');
            return true;
        }
        return false
    }

    /**
     * adds movie to favorite movies by calling helper function
     * @returns {function} postFavoriteMovie()
     */
    function addMovie() {
        setaddMovieMsg('');
        let movieExists = findMovie(titleToAdd);

        if (movieExists && !favoriteMovies) {
            setfavoriteMovies([movieExists]);
            return postFavoriteMovie(movieExists);
        }

        if (movieExists && !duplicateMovie(movieExists)) {
            setfavoriteMovies([...favoriteMovies, movieExists]);
            return postFavoriteMovie(movieExists);
        }
    }

    /**
     * adds favorite movie to API
     * @param {object} movie 
     */
    function postFavoriteMovie(movie) {
        let accessToken = localStorage.getItem("token");

        let formData = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday,
            FavoriteMovies: [...user.FavoriteMovies, movie._id]
        }

        axios.post(`https://greendragonflix.herokuapp.com/users/${user.Username}/movies/${movie._id}`, movie, {
            headers: { 
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            console.log('movie has been added');
            console.log(response);
            setaddMovieMsg('Movie has been added!');
            setuser(formData);
        }).catch(error => console.log(error))
    }

    /**
     * deletes favorite movie from user favorite movies in API
     * @param {object} movie 
     */
    function deleteMovie(movie) {
        let formData = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday,
            FavoriteMovies: user.FavoriteMovies.filter(id => movie._id !== id)
        }

        setfavoriteMovies(favoriteMovies.filter(m => m._id !== movie._id));

        console.log(formData);

        let token = localStorage.getItem("token");
        axios.delete(`https://greendragonflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, movie).then(
            response => {
                console.log(response);
                setuser(formData);
                setdeleteMovieMsg('Movie has been deleted!')
            }
        ).catch(error => console.log(error))
    }

    /**
     * displays UI that shows user movies they can delete from their favorite movies
     * @returns {component}
     */
   function displayMoviesToDelete() {
        if (favoriteMovies.length === 0 || favoriteMovies.includes(undefined)) {
            return <div>No movies to delete.</div>
        }

        return <div>
            {
            favoriteMovies.map(movie => <p key={movie._id} className="delete-movie" onClick={() => deleteMovie(movie)}>{movie.Title}</p>)
            }
        </div>
   }
   
   /**
    * displays UI that allows user to delete favorite movies
    * @returns {component}
    */
    function deleteMovieView() {
        return <Form>
        <Form.Group>
            <p className='new-info'>This selection will remove a movie from your favorite movies.</p>
            <Form.Label>Select a movie to delete from your favorites: </Form.Label>
            {displayMoviesToDelete()}
            <p>{deleteMovieMsg}</p>
            <Button className="profile-view-button" onClick={() => navigate(-1)}>Main View</Button>
        </Form.Group>
    </Form>
    }

    /**
     * displays UI that warns user they are about to delete their account
     * @returns {component}
     */
    function deleteUserView() {
        return <div>
            <h1>Sorry to see you go!</h1>
            <h2>Warning: if you select this button, you will be logged out (forever) and taken back to the home screen.</h2>
            <Button className="profile-view-button" onClick={() => deregisterUser()}>Delete user</Button>
        </div>
    }

    /**
     * deletes user from the API
     */
    function deregisterUser() {
        let token = localStorage.getItem("token");
        axios.delete(`https://greendragonflix.herokuapp.com/users/${user.Username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
        }).catch(error => console.log(error))
    }

    /**
     * displays user favorite movies
     * @returns {component}
     */
    function displayMovies() {

        if (!favoriteMovies || favoriteMovies.includes(undefined)) {
            return <div>No movies added</div>
        }
        
        return <div>
            {
            favoriteMovies.map(movie => <h2 key={movie._id}>{movie.Title}</h2>)
            }
            </div>
    }
    

    /**
     * determines which view to display based on state variable change (through user selection)
     * @returns {component}
     */
    function renderViews(){
        if (view === "validatePassword") {
            return passwordCheck()
        
        }
        if (view === "Password") {
            return changePasswordView()
        } 
        if (view === "Email") {
            return changeEmailView()
        }
        if (view === "Username") {
            return changeUsernameView()
        }
        if (view === "Birthday") {
            return changeBirthdayView()
        }
        if (view === 'addMovie') {
            return addMovieView()
        }
        if (view === 'deleteUser') {
            return deleteUserView()
        }
        if (view === 'deleteMovie') {
            return deleteMovieView()
        }

    }

    /**
     * displays UI showing profile page
     * @returns {component}
     */
    if (!view) {

        return <div>
            <Header />
        
            <div className="profile-outer-container">
                
                <div className="">
                    <h1>{username}'s Domain</h1>
                    <p className="update-msg">{updateStatus}</p>
                </div>


                <div className="account-details-container">
                    <div className="account-details-title">
                        <p>Account Details</p>
                    </div>
                    <div className="profile-inner-container">
                        <p className="info-padding">Identity crisis? Change username: </p>
                        <FontAwesomeIcon className="edit-icon" icon="fa-solid fa-feather-pointed" onClick={() => setview("Username")}/>
                        
                    </div>
                    <div className="profile-inner-container">
                        <p className="info-padding">{email}</p>
                      
                        <FontAwesomeIcon className="edit-icon" icon="fa-solid fa-feather-pointed" onClick={() => setview("Email")}/>
                    </div>
                    <div className="profile-inner-container">
                        <p className="info-padding">Password</p>
                        <FontAwesomeIcon className="edit-icon" icon="fa-solid fa-feather-pointed" onClick={() => setview("Password")}/>
                       
                    </div>     
                    <div className="profile-bottom-border profile-inner-container">
                        <p className="info-padding">{formatBirthday()}</p>
                        
                        <FontAwesomeIcon className="edit-icon" icon="fa-solid fa-feather-pointed" onClick={() => setview("Birthday")}/>
                       
                    </div>
                    <div className="profile-inner-container delete-user-container">
                        <p className="delete-user" onClick={() => setview("deleteUser")}>Delete user</p>
                    </div>
                </div>

                <div className="favorite-movies-container">
                    <div className="account-details-title"><p>Favorite Movies </p></div>
                    <div className="favorite-movies">{displayMovies()}</div>
                    <Button className="profile-view-button" onClick={() => setview('addMovie')}>Add Movie</Button>
                    <Button className="profile-view-button" onClick={() => setview('deleteMovie')}>Delete Movie</Button>
                </div>
                
            </div>
        </div>
    }

    return renderViews();
        
}

export default ProfileView;
