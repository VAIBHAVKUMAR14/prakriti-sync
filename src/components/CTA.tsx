import './CTA.css';

export function CTA({ onStartQuiz }: { onStartQuiz: () => void }) {
    return (
        <section className="cta-section">
            <div className="cta-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            </div>
            <h2>Ready to reconnect with your<br />natural rhythm?</h2>
            <p>Join thousands of professionals who have reclaimed their time and energy.<br />Your personalized Ayurvedic productivity plan is just a diagnostic away.</p>

            <button className="btn-light" onClick={onStartQuiz}>
                Start Free Trial
            </button>
            <p className="no-credit-card">No credit card required for the diagnostic.</p>
        </section>
    );
}
