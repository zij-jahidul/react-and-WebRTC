import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Logo from './Logo';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}

const locationOptions = {
    enableHighAccurancy: true,
    timeout: 5000,
    maximumAge: 0,
}

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/map');
    }

    const onSuccess = (position) => {
        console.log(position);
    }

    const onError = (error) => {
        console.log("Error occurred");
        console.log(error);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
    }, []);

    return (
        <div className='l_page_main_container'>
            <div className='l_page_box'>
                <Logo />
                <LoginInput username={username} setUsername={setUsername} />
                <LoginButton disabled={!isUsernameValid(username)} onClickHandler={handleLogin} />
            </div>
        </div>
    )
}

export default LoginPage