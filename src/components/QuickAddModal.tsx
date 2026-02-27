import { useState, FormEvent } from 'react';
import { Event } from '../utils/calculateBurnout';
import './QuickAddModal.css';

interface Props {
    onClose: () => void;
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export function QuickAddModal({ onClose, setEvents }: Props) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Deep Work');
    const [durationMinutes, setDurationMinutes] = useState('60');
    const [intensity, setIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newEvent: Event = {
            id: Date.now().toString(),
            title: title || 'Untitled Event',
            type,
            durationMinutes: Number(durationMinutes) || 60,
            intensity
        };

        setEvents((prev) => [...prev, newEvent]);
        onClose();
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
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Save Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
