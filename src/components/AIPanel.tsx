import { useAuth } from '../AuthContext';
import { calculateScore, generateInsights, Event } from '../utils/calculateBurnout';
import './AIPanel.css';

interface Props {
    events: Event[];
}

export function AIPanel({ events }: Props) {
    const { savedDosha } = useAuth();
    const userDosha = savedDosha || 'Vata';

    const burnoutData = calculateScore(events, userDosha);
    const insights = generateInsights(events, userDosha);

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
                {insights.aiSummary.text} <span style={{ color: insights.aiSummary.color, fontWeight: '600' }}>{insights.aiSummary.highlight}</span>{insights.aiSummary.suffix}
            </p>

            <div className="threshold-section">
                <div className="threshold-header">
                    <h4>Burnout Threshold</h4>
                    <span className={`threshold-value ${burnoutData.textColor}`}>
                        {burnoutData.percentage}%
                    </span>
                </div>
                <div className="burnout-progress-container">
                    <div
                        className={`burnout-progress-fill ${burnoutData.uiColor}`}
                        style={{
                            width: `${burnoutData.percentage}%`
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
                        <h5>{insights.drainer.title}</h5>
                        <p>{insights.drainer.subtext}</p>
                    </div>
                </div>

                <div className="insight-card positive">
                    <div className="insight-icon positive-icon">✓</div>
                    <div className="insight-content">
                        <h5>{insights.alignment.status}</h5>
                        <p>{insights.alignment.subtext}</p>
                    </div>
                </div>
            </div>

            <div className="rituals-section">
                <h4 className="section-label">RECOMMENDED RITUALS</h4>
                <div className="rituals-grid">
                    {insights.rituals.map((ritual, idx) => (
                        <div key={idx} className="ritual-btn">
                            <span className="ritual-icon">{ritual.icon}</span>
                            {ritual.label}
                        </div>
                    ))}
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
