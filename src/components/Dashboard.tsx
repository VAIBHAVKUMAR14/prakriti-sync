import { useState } from 'react';
import './Dashboard.css';
import { Sidebar } from './Sidebar';
import { SmartCalendar } from './SmartCalendar';
import { AIPanel } from './AIPanel';
import { Habits } from './Habits';
import { Event } from '../utils/calculateBurnout';

export type DashboardTab = 'calendar' | 'habits' | 'insights' | 'profile' | 'settings';

interface Props {
    events: Event[];
    onResetEvents: () => void;
}

export function Dashboard({ events, onResetEvents }: Props) {
    const [activeTab, setActiveTab] = useState<DashboardTab>('calendar');

    return (
        <div className="dashboard-layout fade-in">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onSecretReset={onResetEvents} />

            {activeTab === 'calendar' && <SmartCalendar />}
            {activeTab === 'habits' && <Habits />}
            {/* Fallback for other mock tabs for now */}
            {['insights', 'profile', 'settings'].includes(activeTab) && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon...
                </div>
            )}

            <AIPanel events={events} />
        </div>
    );
}
