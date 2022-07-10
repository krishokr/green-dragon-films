import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function PasswordView(props) {
    console.log('password view is called before render')
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    function validatePassword() {
        
        if (!password) {
            seterror('Password is required.');

        } else if (password.length < 6) {
            seterror('Password must be 6 characters long.');

        }
        seterror('');
        return error
    }

    function handleSubmit() {
        // props.addUserInfo('password', password);
        // props.changeStep(4);
        if (!error) {
            
            props.handleSubmit();
        }
    }


    return (
        <div>
            <h4 className="intro-text-step">"Keep it secret, keep it safe." <br/> -Gandalf the Gray</h4>
     
            <Form.Group controlId="formPassword">
                <Form.Label>Choose your password: </Form.Label>
                <Form.Control type="password" onChange={e => {
                    console.log(e.currentTarget.value)
                    props.addPassword(e.currentTarget.value);
                }} ></Form.Control>
                <p className="errorMessage">{error}</p>
                <p>Note: On submit you will be asked to login.</p>
                <Button className="btn-primary-custom" variant="primary" type="button" onClick={handleSubmit}>Off to Neverland</Button>
            </Form.Group>
            
        </div>
    );
}

export default PasswordView;