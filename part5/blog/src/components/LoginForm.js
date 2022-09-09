import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        props.userLogin({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            {props.children}
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id='username'
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        type={'text'}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        type={'password'}
                    />
                </div>
                <div>
                    <button id='button-login' type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    userLogin: PropTypes.func.isRequired,
};

export default LoginForm;
