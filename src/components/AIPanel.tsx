import { useAuth } from '../AuthContext';
import { getBurnoutThreshold, Event } from '../utils/calculateBurnout';
import './AIPanel.css';

interface Props {
    events: Event[];
}

export function AIPanel({ events }: Props) {
    const { savedDosha } = useAuth();
    const userDosha = savedDosha || 'Vata';

    const burnoutData = getBurnoutThreshold(events, userDosha, 5);

    return (
        <aside className="ai-panel">
            <div className="ai-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8H9L12 2Z" fill="var(--accent-mint)" />
                    <path d="M12 22L9 16H15L12 22Z" fill="var(--accent-mint)" />
                </svg>
                <h3>Sanjeevani AI</h3>
            </div>

            <p className="ai-summary">
                Your energy is currently trending towards <span style={{ color: 'orange', fontWeight: '600' }}>High Pitta</span> (Heat). Schedule cooling activities.
            </p>

            <div className="threshold-section">
                <div className="threshold-header">
                    <h4>Burnout Threshold</h4>
                    <span
                        className="threshold-value"
                        style={{ color: burnoutData.percentage >= 75 ? '#f44336' : 'var(--accent-mint)' }}
                    >
                        {burnoutData.percentage}%
                    </span>
                </div>
                <div className="burnout-progress-container">
                    <div
                        className="burnout-progress-fill"
                        style={{
                            width: `${burnoutData.percentage}%`,
                            backgroundColor: burnoutData.uiColor
                        }}
                    />
                </div>
                <p className="threshold-caption">{burnoutData.statusText}</p>
            </div>

            <div className="insights-section">
                <h4 className="section-label">DAILY INSIGHTS</h4>

                <div className="insight-card alert">
                    <div className="insight-icon alert-icon">!</div>
                    <div className="insight-content">
                        <h5>Energy Clash Detected</h5>
                        <p>Client call at 2pm coincides with your natural energy dip (Vata low).</p>
                        <button className="btn-resolve">Reschedule Suggested</button>
                    </div>
                </div>

                <div className="insight-card positive">
                    <div className="insight-icon positive-icon">✓</div>
                    <div className="insight-content">
                        <h5>Focus Window</h5>
                        <p>Optimal focus time: 10am - 12pm. Use for deep work.</p>
                    </div>
                </div>
            </div>

            <div className="rituals-section">
                <h4 className="section-label">RECOMMENDED RITUALS</h4>
                <div className="rituals-grid">
                    <div className="ritual-btn">
                        <span className="ritual-icon">💧</span>
                        Hydrate
                    </div>
                    <div className="ritual-btn">
                        <span className="ritual-icon">🧘</span>
                        Meditate
                    </div>
                </div>
            </div>

            <div className="ai-footer">
                <button className="btn-primary full-width">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Optimize My Week
                </button>
            </div>
        </aside>
    );
}
