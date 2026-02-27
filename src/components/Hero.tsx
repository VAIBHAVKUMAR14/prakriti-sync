import './Hero.css';
import { DashboardMockup } from './DashboardMockup';

interface Props {
    onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: Props) {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="ayurvedic-tag">
                    <span className="dot"></span>
                    AYURVEDIC CHRONOBIOLOGY
                </div>

                <h1 className="hero-title">
                    Harmonize Your<br />
                    Workflow with<br />
                    <span className="highlight-mint">Ancient Wisdom</span>
                </h1>

                <p className="hero-subtitle">
                    Merge your digital calendar with your Ayurvedic biological clock. Prevent burnout and optimize prana by working when your body is ready, not just when your calendar dictates.
                </p>

                <div className="hero-actions">
                    <button className="btn-primary" onClick={onStartQuiz}>
                        Start Your Dosha Diagnostic
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>

                <div className="hero-metrics">
                    <div className="metric">
                        <h3>5k+</h3>
                        <p>Users Aligned</p>
                    </div>
                    <div className="metric">
                        <h3>32%</h3>
                        <p>Burnout Reduction</p>
                    </div>
                    <div className="metric">
                        <h3>4.9</h3>
                        <p>App Rating</p>
                    </div>
                </div>
            </div>

            <div className="hero-visual">
                <DashboardMockup />
            </div>
        </section>
    );
}
