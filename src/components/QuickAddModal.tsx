import { useState, FormEvent } from 'react';
import { useAuth } from '../AuthContext';
import { Event } from '../utils/calculateBurnout';
import './QuickAddModal.css';

interface Props {
    onClose: () => void;
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    onEventCreated: () => void;
}

export function QuickAddModal({ onClose, setEvents, onEventCreated }: Props) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Deep Work');
    const [durationMinutes, setDurationMinutes] = useState('60');
    const [intensity, setIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');

    const now = new Date();
    // Format to local YYYY-MM-DDTHH:mm for datetime-local input
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
    const [startDateTime, setStartDateTime] = useState(localISOTime);

    const { user } = useAuth();
    const token = user?.googleAccessToken;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const duration = Number(durationMinutes) || 60;

        const newEvent: Event = {
            id: Date.now().toString(),
            title: title || 'Untitled Event',
            type,
            durationMinutes: duration,
            intensity,
            timestamp: startDateTime
        };

        setEvents((prev) => [...prev, newEvent]);

        if (token) {
            setIsSubmitting(true);
            try {
                const startTime = new Date(startDateTime);
                const endTime = new Date(startTime.getTime() + duration * 60000);

                const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        summary: newEvent.title,
                        description: `Type: ${newEvent.type}\nIntensity: ${newEvent.intensity}`,
                        start: {
                            dateTime: startTime.toISOString(),
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                        },
                        end: {
                            dateTime: endTime.toISOString(),
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                        }
                    })
                });

                if (!response.ok) {
                    console.error("Failed to create Google Calendar event", await response.text());
                } else {
                    onEventCreated();
                }
            } catch (err) {
                console.error("Error creating event:", err);
            } finally {
                setIsSubmitting(false);
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <div className="modal-header">
                    <h3>Add New Event</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Event Title</label>
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="e.g. Design Sync"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Start Date & Time</label>
                        <input
                            type="datetime-local"
                            className="modal-input"
                            value={startDateTime}
                            onChange={(e) => setStartDateTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Type</label>
                        <select
                            className="modal-input"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Deep Work">Deep Work</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Admin">Admin</option>
                            <option value="Break">Break</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Duration (Minutes)</label>
                        <input
                            type="number"
                            className="modal-input"
                            value={durationMinutes}
                            onChange={(e) => setDurationMinutes(e.target.value)}
                            min="5"
                            step="5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Intensity</label>
                        <select
                            className="modal-input"
                            value={intensity}
                            onChange={(e) => setIntensity(e.target.value as 'Low' | 'Medium' | 'High')}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
