import { useAuth } from '../AuthContext';
import { generateInsights, Event } from '../utils/calculateBurnout';
import './AyurvedicInsights.css';

interface Props {
    events: Event[];
}

export function AyurvedicInsights({ events }: Props) {
    const { savedDosha } = useAuth();
    const userDosha = savedDosha || 'Vata';

    const insights = generateInsights(events, userDosha);

    return (
        <section className="insights-dashboard fade-in">
            <header className="insights-header">
                <h2>Ayurvedic Workflow Insights</h2>
                <p>Data-driven alignment of your biological rhythms and daily schedule.</p>
            </header>

            <div className="insights-grid">

                {/* Card 1: Pranic Alignment */}
                <div className={`insight-card-main alignment-card border-${insights.alignment.chartColor}-500/30`}>
                    <div className="card-top">
                        <div className="card-title-group">
                            <span className="card-icon">⚡</span>
                            <h3>Pranic Alignment</h3>
                        </div>
                        <div className="alignment-ring">
                            <svg viewBox="0 0 36 36" className={`circular-chart ${insights.alignment.chartColor}`}>
                                <path className="circle-bg"
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray={`${insights.alignment.percentage}, 100`}
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className="percentage">{insights.alignment.percentage}%</text>
                            </svg>
                        </div>
                    </div>

                    <div className="card-bottom">
                        <h4 className={`${insights.alignment.colorClass} font-semibold mb-1 text-lg`}>{insights.alignment.status}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {insights.alignment.subtext}
                        </p>
                    </div>
                </div>

                {/* Card 2: Primary Energy Drainer */}
                <div className="insight-card-main drainer-card">
                    <div className="card-top">
                        <div className="card-title-group">
                            <span className="card-icon alert">⚠️</span>
                            <h3>Primary Energy Drainer</h3>
                        </div>
                    </div>

                    <div className="card-bottom mt-4">
                        <h4 className="text-red-500 font-bold mb-2 text-xl">{insights.drainer.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {insights.drainer.subtext}
                        </p>
                    </div>
                </div>

                {/* Card 3: Sanjeevani AI Recommendation */}
                <div className="insight-card-main ai-rec-card">
                    <div className="card-top">
                        <div className="card-title-group">
                            <span className="card-icon ai">✨</span>
                            <h3>Sanjeevani AI Recommendation</h3>
                        </div>
                    </div>

                    <div className="card-bottom mt-4">
                        <h4 className="text-emerald-400 font-bold mb-2 text-lg">{insights.recommendation.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {insights.recommendation.text}
                        </p>

                        <button className="mt-6 w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                            <span>{insights.recommendation.buttonText}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
