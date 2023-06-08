// imported necessary modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

// Login page component
const LoginPage = () => {
    // dispatch hook
    const dispatch = useDispatch();
    // state hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // handle submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    // return jsx, form for email and password
    return (
        <main className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </form>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </main>
    );
};

export default LoginPage;
