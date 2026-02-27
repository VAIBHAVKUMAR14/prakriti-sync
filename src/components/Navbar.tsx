import { useAuth } from '../AuthContext';
import './Navbar.css';

interface Props {
    onLoginClick?: () => void;
    isDashboard?: boolean;
    onQuickAddClick?: () => void;
}

export function Navbar({ onLoginClick, isDashboard, onQuickAddClick }: Props) {
    const { user, savedDosha, logout } = useAuth();

    if (isDashboard) {
        return (
            <nav className="navbar dashboard-navbar fade-in">
                <div className="nav-search-bar">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="text" placeholder="Search meetings, doshas, or insights..." />
                </div>

                <div className="dashboard-nav-links">
                    <a href="#">Dashboard</a>
                    <a href="#" className="active-link">My Dinacharya</a>
                    <a href="#">Integrations</a>
                </div>

                <div className="dashboard-actions">
                    <button className="icon-btn notification-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="notification-dot"></span>
                    </button>
                    <button className="btn-quick-add" onClick={onQuickAddClick}>
                        + Quick Add
                    </button>
                    <div className="profile-wrapper" onClick={logout} title={`Logout ${user?.name || 'User'}`}>
                        <img
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'Felix'}&backgroundColor=f1f5f9`}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8H9L12 2Z" fill="var(--accent-mint)" />
                    <path d="M12 22L9 16H15L12 22Z" fill="var(--accent-mint)" />
                    <path d="M2 12L8 9V15L2 12Z" fill="var(--accent-mint)" />
                    <path d="M22 12L16 15V9L22 12Z" fill="var(--accent-mint)" />
                </svg>
                <span>Prakriti Sync</span>
            </div>
            <div className="navbar-links">
                <a href="#science">The Science</a>
                <a href="#app">The App</a>

                {user ? (
                    <div className="user-profile">
                        {savedDosha && <span className="user-dosha">{savedDosha}</span>}
                        <span className="user-name">{user.name}</span>
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button className="btn-login" onClick={onLoginClick}>Login</button>
                )}
            </div>
        </nav>
    );
}
