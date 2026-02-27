import './Features.css';

export function Features() {
    return (
        <section className="features-section" id="science">
            <div className="features-header">
                <h2>The Science of Prakriti Sync</h2>
                <p>We combine modern chronobiology with timeless Ayurvedic principles to create a schedule that honors your natural rhythms.</p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon circ-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    </div>
                    <div className="feature-bg-icon">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--bg-dark)" opacity="0.4"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    </div>
                    <h3>Circadian Alignment</h3>
                    <p>Sync your work hours with the sun. Leverage natural cortisol spikes for deep work and melatonin onset for winding down.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon dosha-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                    </div>
                    <div className="feature-bg-icon">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--bg-dark)" opacity="0.4"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                    </div>
                    <h3>Dosha-Based Tasks</h3>
                    <p>Automatically categorize tasks. Creative brainstorming during Vata time, execution during Pitta, and admin during Kapha.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon prana-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><path d="M14 2v6h6"></path><path d="M12 18v-6"></path><path d="m9 15 3-3 3 3"></path></svg>
                    </div>
                    <div className="feature-bg-icon">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--bg-dark)" opacity="0.4"><path d="M5 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><path d="M14 2v6h6"></path><path d="M12 18v-6"></path><path d="m9 15 3-3 3 3"></path></svg>
                    </div>
                    <h3>Prana Optimization</h3>
                    <p>Visualize your energy reserves in real-time. Our algorithm predicts burnout before it happens and suggests micro-breaks.</p>
                </div>
            </div>
        </section>
    );
}
