import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
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

import { Event } from '../utils/calculateBurnout';

export function SmartCalendar({ refreshEventsTrigger, appEvents }: { refreshEventsTrigger?: number, appEvents?: Event[] }) {
    const { user } = useAuth();
    const token = user?.googleAccessToken;

    const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 06:00 to 22:00

    // Calculate current week dates (Mon - Sun)
    const getWeekDates = () => {
        const today = new Date();
        const currentDayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDayOfWeek + 1); // Monday
        startOfWeek.setHours(0, 0, 0, 0);

        const columns = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            columns.push(date);
        }
        return { startOfWeek, columns };
    };

    const { startOfWeek, columns } = getWeekDates();
    const columnHeaders = columns.map(date => {
        const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const dateNum = date.getDate();
        return `${day} ${dateNum}`;
    });

    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const populateEvents = async () => {
            let externalEvents: CalendarEvent[] = [];

            if (token) {
                console.log("Starting calendar fetch with token:", token);
                setIsLoading(true);
                try {
                    const start = new Date(startOfWeek);
                    const end = new Date(startOfWeek);
                    end.setDate(start.getDate() + 7); // End of Sunday

                    console.log(`Fetching events from ${start.toISOString()} to ${end.toISOString()}`);

                    const response = await fetch(
                        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start.toISOString()}&timeMax=${end.toISOString()}&singleEvents=true&orderBy=startTime`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    console.log("Calendar API Response status:", response.status, response.statusText);
                    if (response.ok) {
                        const data = await response.json();
                        externalEvents = (data.items || []).map((item: any) => {
                            const eventStart = new Date(item.start.dateTime || item.start.date);
                            const eventEnd = new Date(item.end.dateTime || item.end.date);

                            const startHour = eventStart.getHours() + (eventStart.getMinutes() / 60);
                            const endHour = eventEnd.getHours() + (eventEnd.getMinutes() / 60);

                            const dayOfWeek = eventStart.getDay();
                            const gridColumn = dayOfWeek === 0 ? 7 : dayOfWeek;

                            const types: ('sattva' | 'rajas' | 'tamas')[] = ['sattva', 'rajas', 'tamas'];
                            const randomType = types[Math.floor(Math.random() * types.length)];

                            let timeString = 'All Day';
                            if (item.start.dateTime) {
                                timeString = `${eventStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${eventEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                            }

                            return {
                                id: item.id,
                                title: item.summary || 'Busy',
                                time: timeString,
                                type: randomType,
                                gridRowStart: Math.max(Math.round(startHour * 2) + 1, 13),
                                gridRowEnd: Math.min(Math.round(endHour * 2) + 1, 49),
                                gridColumn: gridColumn > 7 ? 7 : gridColumn,
                            };
                        }).filter((e: CalendarEvent) => e.gridRowEnd > e.gridRowStart);
                        // We will no longer fallback to demo events. Simply leave them as parsed.
                    } else {
                        // Fallback if API is disabled or fails
                        externalEvents = [];
                    }
                } catch (err) {
                    console.error("Error fetching Google Calendar events:", err);
                    externalEvents = []; // Guarantee UI doesn't break
                } finally {
                    if (isMounted) setIsLoading(false);
                }
            } else {
                externalEvents = [];
            }

            // We will now merge in appEvents (ones user quickly added but might be pending or purely local)
            if (appEvents) {
                const mappedLocal = appEvents.map((ev: any) => {
                    const eventStart = new Date(ev.timestamp);
                    const eventEnd = new Date(eventStart.getTime() + ev.durationMinutes * 60000);
                    const startHour = eventStart.getHours() + (eventStart.getMinutes() / 60);
                    const endHour = eventEnd.getHours() + (eventEnd.getMinutes() / 60);
                    const dayOfWeek = eventStart.getDay();
                    const gridColumn = dayOfWeek === 0 ? 7 : dayOfWeek;

                    return {
                        id: ev.id,
                        title: ev.title,
                        time: `${eventStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${eventEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                        type: 'rajas' as 'sattva' | 'rajas' | 'tamas',
                        gridRowStart: Math.max(Math.round(startHour * 2) + 1, 13),
                        gridRowEnd: Math.min(Math.round(endHour * 2) + 1, 49),
                        gridColumn: gridColumn > 7 ? 7 : gridColumn,
                    };
                }).filter((e: CalendarEvent) => e.gridRowEnd > e.gridRowStart);

                externalEvents = [...externalEvents, ...mappedLocal];
            }

            if (isMounted) {
                setEvents(externalEvents);
            }
        };

        populateEvents();
        return () => { isMounted = false; };
    }, [token, refreshEventsTrigger, startOfWeek.getTime(), appEvents]);

    const weekRangeString = `${columns[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${columns[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return (
        <section className="smart-calendar">
            <header className="calendar-header">
                <div className="calendar-title-group">
                    <h2>This Week</h2>
                    <span className="calendar-date-range">{weekRangeString}</span>
                </div>
                <div className="calendar-actions">
                    {token ? (
                        <span style={{ fontSize: '0.875rem', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            Synced with Google
                        </span>
                    ) : (
                        <span style={{ fontSize: '0.875rem', color: 'var(--accent-sage)', opacity: 0.8 }}>
                            Sign in to sync actual calendar
                        </span>
                    )}
                    <div className="view-toggle">
                        <button className="active">Week</button>
                    </div>
                </div>
            </header>

            <div className="calendar-grid-container">
                {isLoading && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Loading external events...
                    </div>
                )}
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
                            {columnHeaders.map(col => {
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
                                <div key={hour} className="grid-line" style={{ gridRowStart: hour * 2 + 1, gridColumn: '1 / -1' }}></div>
                            ))}

                            {/* Render Events */}
                            {events.map(event => (
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
