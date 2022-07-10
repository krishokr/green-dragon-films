import React, {useEffect, useState} from 'react';


import EmailView from './registerStepComponents/EmailView';
import PasswordView from './registerStepComponents/PasswordView';
import UsernameView from './registerStepComponents/UsernameView';
import BirthdayView from './registerStepComponents/BirthdayView.jsx';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Register(props) {
    let navigate = useNavigate();
    const [width, setwidth] = useState(window.innerWidth)
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [birthday, setbirthday] = useState('');

    const [step, setStep] = useState(1);

    const isMobile = width <= 768;


    useEffect(() => {
        window.addEventListener('resize', setwidth(window.innerWidth));
    },[])

    /**
     * submits user registration data to API
     */
    let handleSubmit = () => {
        let formData = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday
        }
        console.log(formData);
        axios.post('https://greendragonflix.herokuapp.com/users', formData)
        .then( response => {
            const data = response.data;
            console.log('Logged in user: ' + data);
            navigate("/login");
          
        })
        .catch(error => console.log(error))
    }

    let changeStep = (step) => {
        setStep(step);
    }
    let changeEmail = (email) => {
        setemail(email);
    }
    let changeUsername = (username) => {
        setusername(username);
    }
    let changePassword = (password) => {
        setpassword(password);
    }
    let changeBirthday = (birthday) => {
        setbirthday(birthday);
    }

    /**
     * determines which component to render based on the step state
     * @returns {component}
     */
    function formComponent() {       
        console.log(step);
        if (step === 1) {
            return <EmailView changeStep = {changeStep} addEmail={changeEmail} />
        } 
        else if (step === 2) {
            return <BirthdayView changeStep = {changeStep} addBirthday={changeBirthday} />
        } 
        else if (step === 3) {
            return <UsernameView changeStep = {changeStep} addUsername={changeUsername} />
        } 
        
        else if (step === 4) {
            return <PasswordView handleSubmit={handleSubmit} addPassword={changePassword} />
        } 
    }

    /**
     * changes display if viewport is of a mobile size
     */
    if (isMobile) {
        return <div className='mobile-container'>
            <div className="title-text">                
                <h1 className="logo">Green Dragon Films</h1> 
            </div>

            <div className="component-text">

                <Form className="register-form">
                    {formComponent()}
                </Form>
                <div className='division'></div>
                <div className="view-login-container">
                                   
                    <h5 className='login-button' onClick={() => navigate("/login")}>Login</h5>                 
                </div>
            </div>
        </div>
    }
  
    /**
     * displays splash page UI allowing user to register or login
     * @return {component}
     */
    return (
        <div className="register-container">
            <div className="left">
                
                <h1 className="logo">Green Dragon Films</h1>
                <h3>Enter your adventure log: <br/> a refuge to delve into your favorite legends, fables, and lore.</h3>
              
            </div>

            <div className="right">

                <Form className="register-form">
                    {formComponent()}
                </Form>
          
                <div className="view-login-container">
                                    
                        <Button className="btn-primary-custom" onClick={() => navigate("/login")}>Login</Button>                 
                </div>
            </div>
            
        </div>
    );
}

export default Register;