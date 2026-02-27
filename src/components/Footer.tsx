import './Footer.css';

export function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-content">
                <div className="footer-logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15 8H9L12 2Z" fill="var(--accent-mint)" />
                        <path d="M12 22L9 16H15L12 22Z" fill="var(--accent-mint)" />
                        <path d="M2 12L8 9V15L2 12Z" fill="var(--accent-mint)" />
                        <path d="M22 12L16 15V9L22 12Z" fill="var(--accent-mint)" />
                    </svg>
                    <span>Prakriti Sync</span>
                </div>

                <div className="footer-links">
                    <a href="#">The Science</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>

                <div className="footer-copyright">
                    © {new Date().getFullYear()} Prakriti Sync.
                </div>
            </div>
        </footer>
    );
}
