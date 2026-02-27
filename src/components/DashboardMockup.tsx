import './DashboardMockup.css';

export function DashboardMockup() {
    return (
        <div className="dashboard-mockup">
            <div className="mockup-header">
                <div className="window-controls">
                    <div className="control close"></div>
                    <div className="control minimize"></div>
                    <div className="control maximize"></div>
                </div>
                <div className="mockup-title">prakriti_dashboard_v2.0</div>
            </div>

            <div className="mockup-body">
                <div className="schedule-column">
                    <h4 className="column-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        DIGITAL SCHEDULE
                    </h4>

                    <div className="timeline-item conflict">
                        <div className="time">09:00 AM - Conflict</div>
                        <div className="task-title">Deep Work Session</div>
                        <div className="task-type">High Intensity</div>
                    </div>

                    <div className="timeline-item optimized">
                        <div className="time">11:00 AM - Optimized</div>
                        <div className="task-title">Team Sync</div>
                        <div className="task-type">Social Interaction</div>
                    </div>

                    <div className="timeline-item upcoming">
                        <div className="time">02:00 PM</div>
                        <div className="task-title">Strategy Review</div>
                    </div>
                </div>

                <div className="biorhythm-column">
                    <h4 className="column-title align-right">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        BIO-RHYTHM
                    </h4>

                    <div className="dosha-visualizer">
                        <div className="glow-ring outer"></div>
                        <div className="glow-ring middle"></div>
                        <div className="glow-ring inner">
                            <div className="dosha-indicator"></div>
                            <div className="current-dosha-text">
                                <span className="label">CURRENT DOSHA</span>
                                <span className="value">Kapha</span>
                                <span className="status">Stable Energy</span>
                            </div>
                        </div>
                        <div className="clock-marker mark-12"></div>
                        <div className="clock-marker mark-3"></div>
                        <div className="clock-marker mark-6"></div>
                        <div className="clock-marker mark-9"></div>
                    </div>
                </div>
            </div>

            <div className="misalignment-alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="alert-icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <div className="alert-content">
                    <h5>Misalignment Detected</h5>
                    <p>High intensity task scheduled during Kapha slump. Reschedule suggested.</p>
                </div>
            </div>
        </div>
    );
}
