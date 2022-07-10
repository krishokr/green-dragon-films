import React, {useState} from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useNavigate} from 'react-router-dom';

import './Style/LoginView.css';

import {setUser} from './actions/actions.js';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';


function Login(props) {
    let navigate = useNavigate();
    const [error, seterror] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const dispatch = useDispatch();
    const setuser = bindActionCreators(setUser, dispatch);


    /**
     * determines if username entered is valid
     * @returns {boolean}
     */
    function validUsername() {
        if (!username) {
            seterror('Please enter a username.');
            return false;
        }
        return true
    }

    /**
     * determines if password entered is valid
     * @returns {boolean}
     */

    function validPassword() {
        if (!password) {
            seterror('Password required.');
            return false;
        }  
       
        return true;
    }


    /**
     * determines if username and password are valid
     * @returns {boolean}
     */
   function isValid() {
        seterror('');
        if (validUsername() && validPassword()) {
            return true;
        }
        return false;
   }

   /**
    * posts user login to API and gets token and user data
    */
    function handleSubmit() {
        
        if (isValid()) {
            console.log('posting user...');
            axios.post('https://greendragonflix.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                console.log('Logged in user: ' + data);
                setuser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem('user', data.user.Username);

                navigate("/browse");
            })
            .catch((error) => {
                console.log(error)
                seterror("User does not exist.")})
        
            console.log('user has been logged in.')
        }
    }

    return (
        <div className="login-container">
            <h1 className="logo">GREEN DRAGON</h1>
            <div className="form-container">
                <div className='form-inner-container'>
                    <h1>Sign In</h1>
                    <Form>
                            <Form.Group className="login-input" controlId="formUsername">
                                <Form.Control placeholder="Username" value={username} type="text" onChange={e => setusername(e.target.value)} />
                                <p className="errorMessage">{error}</p>
                            </Form.Group>

                            <Form.Group className="login-input">
                                <Form.Control placeholder="Password" value={password} type="password" onChange={e => setpassword(e.target.value)} />
                                <p className="errorMessage">{error}</p>
                            </Form.Group>

                            <Button className="btn-primary-custom" onClick={() => handleSubmit()}>Login</Button>
                            <div className='register-box'>
                                <p>New to this region?</p>
                                <p className='register-link' onClick={() => navigate("/")} >  Sign up here.</p>
                            </div>
                            
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;