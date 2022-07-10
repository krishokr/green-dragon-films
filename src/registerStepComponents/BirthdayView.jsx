import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function BirthdayView(props) {
    const [birthday, setbirthday] = useState('');
    const [error, seterror] = useState('');

    useEffect(() => {
        seterror('');
        if (!birthday) {        
            seterror('Please enter a valid date.');
            return error
        }
       
    },[error, birthday])

    function handleClick () {
        if (!error) {
            props.addBirthday(birthday);
            props.changeStep(3);
        }
    }


    return (
        <div className="step-one-container">
          
            <Form.Group className="step-one-input-container">
                <Form.Label>When did you come into this world?</Form.Label>
                <Form.Control value={birthday} type="date" onChange={e => setbirthday(e.target.value)} ></Form.Control>
                <p className="errorMessage">{error}</p>
                <Button className="btn-primary-custom" onClick={handleClick}>Next</Button>
            </Form.Group>
        </div>
    );
}

export default BirthdayView;
