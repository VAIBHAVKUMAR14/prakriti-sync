import { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { DoshaQuiz } from './components/DoshaQuiz';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { QuickAddModal } from './components/QuickAddModal';
import { Event } from './utils/calculateBurnout';

function AppContent() {
    const { savedDosha } = useAuth();
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([
        { id: '1', title: 'Deep Work Session', type: 'Deep Work', durationMinutes: 120, intensity: 'High' },
        { id: '2', title: 'Team Sync', type: 'Meeting', durationMinutes: 60, intensity: 'High' }
    ]);

    const handleResetEvents = () => {
        setEvents([
            { id: '1', title: 'Deep Work Session', type: 'Deep Work', durationMinutes: 120, intensity: 'High' },
            { id: '2', title: 'Team Sync', type: 'Meeting', durationMinutes: 60, intensity: 'High' }
        ]);
        console.log("Events Reset secretly!"); // Small feedback for debugging later if needed
    };

    // If Dosha is strictly saved AND not explicitly trying to login/take quiz, show dashboard
    // This strictly guards the dashboard view so users MUST complete the quiz first.
    if (savedDosha && !isQuizOpen && !isLoginOpen) {
        return (
            <div className="app-container">
                <Navbar
                    onLoginClick={() => setIsLoginOpen(true)}
                    isDashboard={true}
                    onQuickAddClick={() => setIsQuickAddOpen(true)}
                />
                <Dashboard events={events} onResetEvents={handleResetEvents} />

                {isQuickAddOpen && (
                    <QuickAddModal
                        onClose={() => setIsQuickAddOpen(false)}
                        setEvents={setEvents}
                    />
                )}
            </div>
        );
    }

    // If login is open, show the Login component
    if (isLoginOpen) {
        return (
            <main className="login-container fade-in">
                <Login
                    onBack={() => setIsLoginOpen(false)}
                    onSuccess={() => setIsLoginOpen(false)}
                />
            </main>
        );
    }

    // If quiz is open, show the DoshaQuiz component
    if (isQuizOpen) {
        return (
            <main className="quiz-container fade-in">
                <DoshaQuiz onClose={() => setIsQuizOpen(false)} />
            </main>
        );
    }

    // Default Landing Page State (when neither dashboard, login, nor quiz is open)
    return (
        <div className="app-container fade-in">
            <Navbar onLoginClick={() => setIsLoginOpen(true)} />

            {/* Render landing page components only if quiz and login are not open */}
            {!isQuizOpen && !isLoginOpen && (
                <>
                    <Hero onStartQuiz={() => setIsQuizOpen(true)} />
                    <Features />
                    <CTA onStartQuiz={() => setIsQuizOpen(true)} />
                </>
            )}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
