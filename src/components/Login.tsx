import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Login.css';

interface Props {
    onBack: () => void;
    onSuccess: () => void;
}

export function Login({ onBack, onSuccess }: Props) {
    const { login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const storedUsersStr = localStorage.getItem('prakriti_users_db');
        const db = storedUsersStr ? JSON.parse(storedUsersStr) : {};

        const userKey = email.toLowerCase();

        if (isSignUp) {
            // Check if user already exists
            if (db[userKey]) {
                setErrorMsg('An account with this email already exists.');
                return;
            }

            // Register new user (In a real app, never store plaintext passwords!)
            const displayName = name || email.split('@')[0];
            db[userKey] = {
                name: displayName,
                password: password // Simulated DB storage
            };
            localStorage.setItem('prakriti_users_db', JSON.stringify(db));
            login(email, displayName);
            onSuccess();
        } else {
            // Sign in verification
            const userData = db[userKey];
            if (!userData) {
                setErrorMsg('Account not found. Please sign up first.');
                return;
            }

            if (userData.password !== password) {
                setErrorMsg('Incorrect password. Please try again.');
                return;
            }

            // Success
            login(email, userData.name);
            onSuccess();
        }
    };

    return (
        <div className="login-wrapper fade-in">
            <button className="btn-close" onClick={onBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="login-card">
                <div className="login-header">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-logo">
                        <path d="M12 2L15 8H9L12 2Z" fill="var(--accent-mint)" />
                        <path d="M12 22L9 16H15L12 22Z" fill="var(--accent-mint)" />
                        <path d="M2 12L8 9V15L2 12Z" fill="var(--accent-mint)" />
                        <path d="M22 12L16 15V9L22 12Z" fill="var(--accent-mint)" />
                    </svg>
                    <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
                    <p>Sign in to sync your biological rhythms.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {errorMsg && (
                        <div className="login-error" style={{ color: 'var(--accent-error)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                            {errorMsg}
                        </div>
                    )}

                    {isSignUp && (
                        <div className="input-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="How should we address you?"
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="password-header">
                            <label htmlFor="password">Password</label>
                            {!isSignUp && <a href="#" className="forgot-password">Forgot password?</a>}
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary login-submit">
                        {isSignUp ? 'Sign up' : 'Sign in'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button className="btn-toggle" onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
