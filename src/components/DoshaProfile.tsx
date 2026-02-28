import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { BreathingScreen } from './BreathingScreen';
import { DeskMovementModal } from './DeskMovementModal';
import './DoshaProfile.css';

export function DoshaProfile() {
    const { savedDosha } = useAuth();
    const userDosha = savedDosha || 'Vata';

    const [isBreathingOpen, setIsBreathingOpen] = useState(false);
    const [isMovementOpen, setIsMovementOpen] = useState(false);

    return (
        <section className="dosha-profile-dashboard fade-in">
            <header className="profile-header text-center">
                <h2 className="text-3xl font-bold mb-2">Dosha Profile Hub</h2>
                <p className="text-gray-400">Your personalized ecosystem for energetic balance</p>
            </header>

            <div className="ecosystem-container">
                {/* Central Hub */}
                <div className="ecosystem-center">
                    <div className="buddha-glow-ring">
                        <img
                            src="https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                            alt="Dosha State"
                            className="buddha-avatar"
                        />
                    </div>
                    <div className="profile-badge text-center mt-6">
                        <h3 className="text-emerald-400 font-bold text-xl uppercase tracking-wider">{userDosha} PROFILE</h3>
                        <div className="pulse-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                {/* Orbiting Nodes */}
                <div className="orbit-nodes">
                    <div className="node node-top cursor-pointer group" onClick={() => setIsBreathingOpen(true)}>
                        <div className="node-icon bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:bg-emerald-800/40">
                            <span className="text-emerald-400 text-xl">🌬️</span>
                        </div>
                        <span className="node-label group-hover:text-emerald-300 transition-colors">PRANAYAMA &<br />SOUND</span>
                    </div>

                    <div className="node node-right cursor-pointer group" onClick={() => setIsMovementOpen(true)}>
                        <div className="node-icon bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:bg-emerald-800/40">
                            <span className="text-emerald-400 text-xl">🏃</span>
                        </div>
                        <span className="node-label group-hover:text-emerald-300 transition-colors">DESK MOVEMENT</span>
                    </div>

                    <div className="node node-bottom-right">
                        <div className="node-icon bg-slate-800 border-slate-700">
                            <span className="text-slate-400 text-xl">💧</span>
                        </div>
                        <span className="node-label">DIET &<br />HYDRATION</span>
                    </div>

                    <div className="node node-bottom-left">
                        <div className="node-icon bg-slate-800 border-slate-700">
                            <span className="text-slate-400 text-xl">👁️</span>
                        </div>
                        <span className="node-label">VISUAL REST</span>
                    </div>

                    <div className="node node-left">
                        <div className="node-icon bg-slate-800 border-slate-700">
                            <span className="text-slate-400 text-xl">🌙</span>
                        </div>
                        <span className="node-label">YOGA NIDRA</span>
                    </div>

                    {/* Dashed Orbit Ring */}
                    <div className="orbit-ring-dashed"></div>
                </div>
            </div>

            {/* Bottom Metrics */}
            <div className="metrics-row flex justify-center gap-6 mt-12">
                <div className="metric-pill">
                    <span className="metric-label">CURRENT STATE</span>
                    <strong className="metric-value text-emerald-400">High {userDosha}</strong>
                </div>

                <div className="metric-pill">
                    <span className="metric-label">FOCUS MODE</span>
                    <strong className="metric-value text-white">Grounding</strong>
                </div>

                <div className="metric-pill">
                    <span className="metric-label">DAILY SYNC</span>
                    <strong className="metric-value text-white">84%</strong>
                </div>
            </div>

            {/* Modals */}
            {isBreathingOpen && <BreathingScreen onClose={() => setIsBreathingOpen(false)} />}
            {isMovementOpen && <DeskMovementModal onClose={() => setIsMovementOpen(false)} />}
        </section>
    );
}
