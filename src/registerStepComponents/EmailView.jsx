import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function EmailView(props) {
    const [email, setemail] = useState('');
    const [error, seterror] = useState('');

    useEffect(() => {
        seterror('');
        if (!email) {      
            console.log('no email')    
            seterror('Please enter a valid email.');
            return error
        }
        else if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@.') > -1) {
            seterror('Please enter a valid email.');
            return error;
        }
    },[error, email])

    function handleClick () {
        if (!error) {
            props.addEmail(email);
            props.changeStep(2);
        }
    }

    
    

    return (
        <div className="step-one-container">
            <h3 className="intro-text-step">To all Heros, Ruffians, Pirates, Warriors: <br/>I bid you a hearty welcome. </h3>
            <Form.Group className="step-one-input-container">
                <Form.Label>What's your email? </Form.Label>
                <Form.Control value={email} type="text" onChange={e => setemail(e.target.value)} ></Form.Control>
                <p className="errorMessage">{error}</p>
                <Button className="btn-primary-custom" onClick={handleClick}>Begin your journey.</Button>
            </Form.Group>
        </div>
    );
}

export default EmailView;