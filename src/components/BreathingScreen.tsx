import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Settings, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import './BreathingScreen.css';

interface Props {
    onClose: () => void;
}

const breathingConfig = {
    Vata: {
        title: '4-7-8 GROUNDING BREATH',
        audioText: '432Hz Binaural Raga (Ahir Bhairav)',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        inhale: 4, hold: 7, exhale: 8
    },
    Pitta: {
        title: 'SHEETALI (COOLING BREATH)',
        audioText: 'Ambient Water/Flute sounds',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        inhale: 4, hold: 0, exhale: 6
    },
    Kapha: {
        title: 'SURYA BHEDANA (HEATING BREATH)',
        audioText: '40Hz Gamma Focus beats',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        inhale: 4, hold: 2, exhale: 4
    }
};

type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale';

export function BreathingScreen({ onClose }: Props) {
    const { savedDosha } = useAuth();
    const activeDosha = savedDosha || 'Vata';
    const config = breathingConfig[activeDosha as keyof typeof breathingConfig];

    const [phase, setPhase] = useState<BreathingPhase>('Inhale');
    const [timeLeft, setTimeLeft] = useState(config.inhale);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) return prev - 1;

                // Time is up, switch phase
                let nextPhase: BreathingPhase = 'Inhale';
                let nextTime = config.inhale;

                if (phase === 'Inhale') {
                    if (config.hold > 0) {
                        nextPhase = 'Hold';
                        nextTime = config.hold;
                    } else {
                        nextPhase = 'Exhale';
                        nextTime = config.exhale;
                    }
                } else if (phase === 'Hold') {
                    nextPhase = 'Exhale';
                    nextTime = config.exhale;
                } else if (phase === 'Exhale') {
                    nextPhase = 'Inhale';
                    nextTime = config.inhale;
                }

                setPhase(nextPhase);
                return nextTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phase, config, isPlaying]);

    const togglePlay = () => {
        const audioEl = document.getElementById('dosha-audio') as HTMLAudioElement;
        if (isPlaying) {
            audioEl?.pause();
        } else {
            audioEl?.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="breathing-screen-overlay fade-in">
            <audio id="dosha-audio" src={config.audioUrl} loop preload="auto" />

            <div className="breathing-top-bar">
                <button className="btn-icon bg-transparent border-none flex items-center justify-center" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="breathing-title-group text-center">
                    <h2 className="text-white font-bold tracking-[0.2em]">{config.title}</h2>
                    <p className="text-emerald-400 text-xs tracking-widest uppercase">{activeDosha} Balancing</p>
                </div>
                <button className="btn-icon bg-transparent border-none flex items-center justify-center">
                    <Settings size={22} />
                </button>
            </div>

            <div className="breathing-main-area">
                <div className="mandala-container">
                    <div className="mandala-glow"></div>
                    <img
                        src="https://images.unsplash.com/photo-1601614392663-8d9607eb3bc6?auto=format&fit=crop&q=80&w=400&h=400"
                        alt="Mandala"
                        className="mandala-img"
                    />

                    <motion.div
                        className="mandala-overlay-text text-center flex flex-col items-center justify-center"
                        animate={{
                            scale: !isPlaying ? 1 : phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1.3,
                            opacity: 1
                        }}
                        transition={{
                            duration: phase === 'Inhale' ? config.inhale : phase === 'Exhale' ? config.exhale : 2,
                            ease: "easeInOut"
                        }}
                    >
                        <h1 className="text-4xl text-white font-light tracking-widest mb-2 uppercase drop-shadow-lg">
                            {!isPlaying ? 'READY' : phase}
                        </h1>
                        <motion.p
                            key={timeLeft}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-emerald-400 text-2xl font-bold tracking-widest drop-shadow-md"
                        >
                            {isPlaying ? timeLeft : '-'}
                        </motion.p>
                    </motion.div>
                </div>

                <div className="breathing-instructions text-center mt-12 text-gray-400 h-16">
                    {!isPlaying && <p>Press play to begin your session</p>}
                    {isPlaying && phase === 'Inhale' && <p>Breathe in deeply through the nose...</p>}
                    {isPlaying && phase === 'Hold' && <p>Hold the prana, maintain stillness...</p>}
                    {isPlaying && phase === 'Exhale' && <p>Release slowly outward...</p>}
                </div>
            </div>

            <div className="breathing-player-bar">
                <div className="player-track-info flex items-center gap-4">
                    <div className="album-art bg-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden shadow-lg border-2 border-slate-800">
                        <img src="https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Audio Art" className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-sm">{config.audioText}</h4>
                        <p className="text-gray-400 text-xs">Prakriti Sync Audio</p>
                    </div>
                </div>

                <div className="player-controls">
                    <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none flex items-center justify-center p-2">
                        <SkipBack size={20} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="play-button flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all border-none"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" className="text-white" /> : <Play size={24} fill="currentColor" className="text-white translate-x-[2px]" />}
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-none flex items-center justify-center p-2">
                        <SkipForward size={20} />
                    </button>
                </div>

                <div className="player-progress">
                    <span className="text-xs text-gray-500 w-8">-:--</span>
                    <div className="progress-bar-bg flex-grow h-1 bg-gray-700/50 rounded-full mx-4 overflow-hidden align-middle">
                        {isPlaying && (
                            <motion.div
                                className="h-full bg-emerald-400/50 rounded-full relative"
                                animate={{ width: ["0%", "100%"] }}
                                transition={{ duration: 300, ease: "linear", repeat: Infinity }}
                            />
                        )}
                        {!isPlaying && <div className="h-full bg-emerald-400/50 rounded-full relative w-0" />}
                    </div>
                    <span className="text-xs text-gray-500 w-8">∞</span>
                </div>
            </div>

            <div className="p-6 flex justify-center w-full">
                <button
                    className="bg-[#1e293b] hover:bg-[#334155] border-2 border-[#334155] text-white font-semibold py-3 px-10 rounded-full transition-colors text-sm tracking-widest outline-none shadow-lg"
                    onClick={onClose}
                >
                    END SESSION
                </button>
            </div>
        </div>
    );
}
