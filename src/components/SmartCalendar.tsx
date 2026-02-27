import './SmartCalendar.css';

interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    type: 'sattva' | 'rajas' | 'tamas';
    gridRowStart: number;
    gridRowEnd: number;
    gridColumn: number;
    alignment?: 'High Focus' | 'State-Shift';
}

const CONST_EVENTS: CalendarEvent[] = [
    {
        id: '1',
        title: 'Morning Sadhana',
        time: '06:00 - 07:30',
        type: 'sattva',
        gridRowStart: 6 * 2,
        gridRowEnd: 7.5 * 2,
        gridColumn: 2 // Monday
    },
    {
        id: '2',
        title: 'Product Launch Sprint',
        time: '10:00 - 12:00',
        type: 'rajas',
        gridRowStart: 10 * 2,
        gridRowEnd: 12 * 2,
        gridColumn: 2,
        alignment: 'High Focus'
    },
    {
        id: '3',
        title: 'Strategy Review',
        time: '13:00 - 14:30',
        type: 'tamas', // Deep focus or potentially misaligned
        gridRowStart: 13 * 2,
        gridRowEnd: 14.5 * 2,
        gridColumn: 3,
        alignment: 'State-Shift'
    },
    {
        id: '4',
        title: 'Light Walk / Reflection',
        time: '18:00 - 19:00',
        type: 'tamas',
        gridRowStart: 18 * 2,
        gridRowEnd: 19 * 2,
        gridColumn: 4
    },
    {
        id: '5',
        title: 'Creative Workshop',
        time: '09:00 - 12:00',
        type: 'rajas',
        gridRowStart: 9 * 2,
        gridRowEnd: 12 * 2,
        gridColumn: 6
    }
];

export function SmartCalendar() {
    const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 06:00 to 22:00
    const columns = ['MON 16', 'TUE 17', 'WED 18', 'THU 19', 'FRI 20'];

    return (
        <section className="smart-calendar">
            <header className="calendar-header">
                <div className="calendar-title-group">
                    <h2>Week 42</h2>
                    <span className="calendar-date-range">Oct 16 - Oct 22, 2023</span>
                </div>
                <div className="calendar-actions">
                    <div className="view-toggle">
                        <button className="active">Week</button>
                        <button>Day</button>
                    </div>
                    <button className="btn-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        Filter View
                    </button>
                    <button className="btn-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Export
                    </button>
                </div>
            </header>

            <div className="calendar-grid-container">
                <div className="calendar-grid">
                    {/* Time Column */}
                    <div className="time-column">
                        <div className="time-header-placeholder"></div>
                        {hours.map(hour => (
                            <div key={hour} className="time-slot-label">
                                {hour.toString().padStart(2, '0')}:00
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    <div className="days-columns">
                        <div className="days-header-row">
                            {columns.map(col => {
                                const [day, date] = col.split(' ');
                                return (
                                    <div key={col} className="day-header">
                                        <span className="day-name">{day}</span>
                                        <span className="day-number">{date}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="events-grid">
                            {/* Horizontal grid lines */}
                            {hours.map(hour => (
                                <div key={hour} className="grid-line" style={{ gridRowStart: hour * 2, gridColumn: '1 / -1' }}></div>
                            ))}

                            {/* Render Events */}
                            {CONST_EVENTS.map(event => (
                                <div
                                    key={event.id}
                                    className={`calendar-event ${event.type}`}
                                    style={{
                                        gridRowStart: event.gridRowStart,
                                        gridRowEnd: event.gridRowEnd,
                                        gridColumnStart: event.gridColumn
                                    }}
                                >
                                    <h5>{event.title}</h5>
                                    <span className="event-time">{event.time}</span>

                                    {event.alignment && (
                                        <div className={`event-alignment-badge ${event.alignment === 'High Focus' ? 'sattva' : 'tamas'}`}>
                                            {event.alignment}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
