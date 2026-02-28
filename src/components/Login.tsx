import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';

interface Props {
    onBack: () => void;
    onSuccess: () => void;
}

export function Login({ onBack, onSuccess }: Props) {
    const { login } = useAuth();
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setErrorMsg('');
            try {
                // Fetch user's Google Profile using the access token
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                if (!userInfoResponse.ok) {
                    throw new Error('Failed to fetch user profile.');
                }

                const userInfo = await userInfoResponse.json();

                // Login application-wide with Google info + token
                login(userInfo.email, userInfo.name || userInfo.given_name, tokenResponse.access_token);
                onSuccess();

            } catch (err) {
                console.error("Error fetching Google user profile:", err);
                setErrorMsg('Something went wrong. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            setErrorMsg('Login Failed. Please check your connection and try again.');
        },
        scope: 'https://www.googleapis.com/auth/calendar.events'
    });


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
                    <h2>Welcome to Prakriti Sync</h2>
                    <p>Sign in with Google to sync your biological rhythms and optimize your calendar.</p>
                </div>

                <div className="login-form">
                    {errorMsg && (
                        <div className="login-error" style={{ color: 'var(--accent-error)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
                            {errorMsg}
                        </div>
                    )}

                    <button
                        onClick={() => googleLogin()}
                        className="btn-primary login-submit"
                        disabled={isLoading}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', backgroundColor: '#fff', color: '#333', border: '1px solid #ccc' }}
                    >
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </button>
                </div>
            </div>
        </div>
    );
}
