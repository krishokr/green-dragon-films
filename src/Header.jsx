import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import './Style/Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector} from 'react-redux';

import Logo from './logo.png';

function Header(props) {
    console.log(props)
    let navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const [profileClass, setprofileClass] = useState('hide-profile');
    const [backgroundClass, setbackgroundClass] = useState('profile-container');
    const [toggleText, settoggleText] = useState('hide-text')


    /**
     * removes token and user from localStorage and then navigates to login/sign up page
     */
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('persist:root');
        navigate("/");

    }

    /**
     * 
     * @returns {function} navigates user to profileView
     */
    
    function handleAccountClick() {
        return navigate(`/users/${user._id}`);
    }

    // function handleHover() {
    //     if (profileClass === 'hide-profile') {
    //         setbackgroundClass('profile-container add-background');
    //         return setprofileClass('show-profile');
    //     }
        
    // }

    // function handleLeave() {
    //     if (profileClass === 'show-profile') {
    //         setprofileClass('hide-profile');
    //         setbackgroundClass('profile-container');
            
    //     }
    // }


    /**
     * @returns {component} displays navigation component
     */

    function navigation() {
        return <div className="nav-container">
            {/* <div className="nav-item" onClick={() => navigate("/browse")}>
                <FontAwesomeIcon icon="fa-solid fa-house-crack" />
                <h4>HOME</h4>
            </div> */}
            <div className="nav-item" onClick={() => navigate("/browse")}>
                <FontAwesomeIcon icon="fa-solid fa-film" />
                <h4>BROWSE</h4>
            </div>
            <div className="nav-item" onClick={() => navigate("/favoriteMovies")}>
                <FontAwesomeIcon icon="fa-solid fa-star" />
                <h4>FAVORITES</h4>
            </div>
            <div className="nav-item" onClick={() => navigate("/search")}>
                <FontAwesomeIcon icon="fa-solid fa-search" />
                <h4>SEARCH</h4>
            </div>
        </div>
    }

    /**
     * displays navigation that changes based on view
     */

    return <Row className={'header-container ' + props.applyZIndex}>
        <h1 className="logo">GREEN DRAGON</h1>
        
        {navigation()}

        <div>
      
              
                {/* <FontAwesomeIcon icon={["fa-solid", "fa-dragon"]} className="header-user-icon" alt="user icon" /> */}
    

            <div className="">
                <div className="button-container">
                    <Button className="btn-primary-custom" onClick={handleAccountClick}>Account</Button>
                    <Button className="logout-button" onClick={logout}>Logout</Button>
                </div>
            </div>

        </div>

        {/* <div onMouseOver={handleHover} onMouseLeave={handleLeave} className={backgroundClass} >
            <div className="row-profile-container">
                <h1 className={profileClass}>Profile</h1>
                <FontAwesomeIcon icon={["fa-solid", "fa-dragon"]} className="header-user-icon" alt="user icon" />
            </div>
            <div className={profileClass}>
                
                <div className="button-container">
                    <p className="link" onClick={handleAccountClick}>Account</p>
                    <p className="link" onClick={logout}>Logout</p>
                </div>
            </div>
        </div> */}

        
        
        
    </Row>
}

export default Header;