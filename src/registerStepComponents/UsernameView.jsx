import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function UsernameView(props) {

    const [username, setusername] = useState('');
    const [error, seterror] = useState('');


    useEffect(() => {
        console.log(username.length);
        seterror('');
        if (!username) {
            return seterror('Username is required.');
        } else if (username.length < 2) {
            return seterror('Username must be 2 characters long.');
        }
    },[username, error])
    
    function handleClick() {
        if (!error) {
            props.addUsername(username);
            props.changeStep(4);
        }
    }


    return (
        <div>
            <h3 className="intro-text-step">Tell me, peasant. <br/>What is your name?</h3>
            <Form.Group controlId="formUsername">
                <Form.Label>What do you wish to be called?</Form.Label>
                <Form.Control value={username} type="text" onChange={e => setusername(e.target.value)} ></Form.Control>
                <p className="errorMessage">{error}</p>
            </Form.Group>
            <Button className="btn-primary-custom" onClick={handleClick}>Next</Button>
        </div>
        
    );
}

export default UsernameView;