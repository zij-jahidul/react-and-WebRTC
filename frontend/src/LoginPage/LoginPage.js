import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Logo from './Logo';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}

function LoginPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/map');
    }

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