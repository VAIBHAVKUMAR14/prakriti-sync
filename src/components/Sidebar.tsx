import { DashboardTab } from './Dashboard';
import { useAuth } from '../AuthContext';
import './Sidebar.css';

interface Props {
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
    onSecretReset: () => void;
}

export function Sidebar({ activeTab, onTabChange, onSecretReset }: Props) {
    const { user, savedDosha } = useAuth();

    // Dynamically calculate the current week's days
    const today = new Date();
    const currentMonthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const currentDayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)

    // Generate dates for Sun-Sat of the current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);

    const weekDates: number[] = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        weekDates.push(d.getDate());
    }

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const activeDateNum = today.getDate();

    return (
        <aside className="sidebar">
            <div className="sidebar-profile">
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.name || 'Guest'}</h3>
                <p className="profile-dosha">{savedDosha ? `${savedDosha} Dominant` : 'Dosha Not Calculated'}</p>
            </div>

            <nav className="sidebar-nav">
                <a
                    href="#"
                    className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onTabChange('calendar'); }}
                >
                    <span className="nav-icon">📅</span>
                    Smart Calendar
                </a>
                <a
                    href="#"
                    className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onTabChange('insights'); }}
                >
                    <span className="nav-icon">📊</span>
                    Insights
                </a>
                <a
                    href="#"
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onTabChange('profile'); }}
                >
                    <span className="nav-icon">🧘‍♀️</span>
                    Dosha Profile
                </a>
                <a
                    href="#"
                    className={`nav-item ${activeTab === 'habits' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onTabChange('habits'); }}
                >
                    <span className="nav-icon">✅</span>
                    Habits
                </a>
                <a
                    href="#"
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); onTabChange('settings'); }}
                >
                    <span className="nav-icon">⚙️</span>
                    Settings
                </a>
            </nav>

            <div className="mini-calendar-section">
                <div className="mini-calendar-header">
                    <h4>{currentMonthYear}</h4>
                    <div className="cal-nav">
                        <span>≺</span>
                        <span>≻</span>
                    </div>
                </div>
                <div className="mini-calendar-grid">
                    {days.map(d => <div key={d} className="cal-day-label">{d}</div>)}
                    {weekDates.map((d, index) => (
                        <div key={index} className={`cal-date ${d === activeDateNum ? 'active-date' : ''}`}>
                            {d}
                        </div>
                    ))}
                </div>
            </div>

            <div className="energy-cycles-legend">
                <h4>ENERGY CYCLES</h4>
                <ul>
                    <li><span className="legend-dot sattva"></span>Sattva (Balance)</li>
                    <li><span className="legend-dot rajas"></span>Rajas (Activity)</li>
                    <li>
                        <span className="legend-dot tamas"></span>
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={onSecretReset}
                            title="Secret Reset"
                        >
                            Tamas
                        </span> (Rest)
                    </li>
                </ul>
            </div>
        </aside>
    );
}
