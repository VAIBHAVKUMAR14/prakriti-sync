import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import './Habits.css';

interface StrategyProps {
    title: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    state: string;
    goal: string;
    activities: { name: string; desc: string }[];
    diet: string;
}

const STRATEGIES: StrategyProps[] = [
    {
        title: "Vata Burnout (The Scattered Mind)",
        dosha: 'vata',
        state: 'Overwhelmed, anxious, experiencing racing thoughts, digital overload, and insomnia. Too much "Air" and movement.',
        goal: 'Grounding, stabilizing, and slowing down the nervous system.',
        activities: [
            { name: "Yoga Nidra (Non-Sleep Deep Rest)", desc: "A 15-to-20 minute guided body scan lying flat on the floor (Savasana). It physically forces the body to stop moving while keeping the mind awake, acting as a hard reset for the nervous system." },
            { name: "The 4-7-8 Breathing Technique", desc: "Inhale for 4 seconds, hold for 7, exhale slowly for 8. This triggers the parasympathetic nervous system and lowers a high heart rate." },
            { name: "Tactile Grounding (Earthing)", desc: "Stepping away from all screens and walking barefoot on grass, or simply washing hands and face with warm water." },
            { name: "Auditory Anchoring", desc: "Listening to low-frequency binaural beats, Tibetan singing bowls, or grounding Ragas (like Raga Ahir Bhairav) to slow brainwave activity." }
        ],
        diet: 'Drink warm, spiced milk (with nutmeg or ashwagandha) or chamomile tea. Avoid caffeine at all costs.'
    },
    {
        title: "Pitta Burnout (The Overheated Mind)",
        dosha: 'pitta',
        state: 'Frustrated, irritable, experiencing intense screen fatigue, eye strain, and a feeling of being "on edge." Too much "Fire" and intensity.',
        goal: 'Cooling, softening, and releasing pressure.',
        activities: [
            { name: "Sheetali Pranayama (Cooling Breath)", desc: "Rolling the tongue into a tube (or pursing the lips) and inhaling slowly, then exhaling through the nose. It physically cools the body temperature and pacifies frustration." },
            { name: "Trataka (Visual Resting)", desc: "Staring gently at a single, non-digital point—like a candle flame or a plant—for 3 to 5 minutes without blinking, then closing the eyes. This relieves severe screen fatigue and eye strain." },
            { name: "Nature Walks (Near Water)", desc: "A 10-minute walk outside, ideally near a fountain, lake, or in a cool breeze. The visual and physical coolness counteracts Pitta heat." },
            { name: "Auditory Softening", desc: "Listening to ambient water sounds, light flute music (Bansuri), or late-night cooling Ragas (like Raga Darbari)." }
        ],
        diet: 'Drink cool (not ice-cold) water infused with mint, fennel, or cucumber. Step away from spicy foods and sour coffee.'
    },
    {
        title: "Kapha Burnout (The Stagnant Mind)",
        dosha: 'kapha',
        state: 'Lethargic, unmotivated, experiencing heavy brain fog, and procrastinating. Too much "Earth" and immobility.',
        goal: 'Stimulating, energizing, and creating momentum.',
        activities: [
            { name: "Surya Bhedana (Heating Breath)", desc: "Blocking the left nostril and breathing exclusively through the right nostril. As you have already designed in your UI, this activates the \"solar\" channel, stimulating the analytical and energetic side of the brain." },
            { name: "Micro-HIIT or Surya Namaskar", desc: "5 to 10 minutes of rapid, heat-building movement. Sun Salutations or even brisk jumping jacks break the physical heaviness and get blood flowing to the brain." },
            { name: "Dry Brushing (Garshana) or Cold Splashes", desc: "Splashing freezing cold water on the face and wrists to instantly shock the nervous system out of lethargy." },
            { name: "Auditory Stimulation", desc: "Listening to upbeat, high-tempo instrumental tracks, fast drumming, or morning Ragas designed to wake the mind." }
        ],
        diet: 'Drink warm water with ginger, black pepper, and honey. Avoid heavy, sweet, or dairy-heavy snacks.'
    }
];

function StrategyCard({ strategy }: { strategy: StrategyProps }) {
    return (
        <article className={`strategy-card ${strategy.dosha}`}>
            <div className="strategy-header">
                <h2>{strategy.title}</h2>
            </div>

            <div className="strategy-body">
                <div className="state-goal-group">
                    <div className="info-block">
                        <h4>The State</h4>
                        <p>{strategy.state}</p>
                    </div>
                    <div className="info-block accent">
                        <h4>The Goal</h4>
                        <p>{strategy.goal}</p>
                    </div>
                </div>

                <div className="activities-list">
                    <h4>Prescribed Activities</h4>
                    <ul>
                        {strategy.activities.map((act, idx) => (
                            <li key={idx}>
                                <strong>{act.name}:</strong> {act.desc}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="diet-nudge">
                    <h4>Dietary Nudge</h4>
                    <p>{strategy.diet}</p>
                </div>
            </div>
        </article>
    );
}

export function Habits() {
    const { savedDosha } = useAuth();

    // Map the context 'Vata', 'Pitta', 'Kapha' strings to the union type
    const doshaMap: Record<string, 'vata' | 'pitta' | 'kapha'> = {
        'Vata': 'vata',
        'Pitta': 'pitta',
        'Kapha': 'kapha'
    };

    const defaultDosha = savedDosha && doshaMap[savedDosha] ? doshaMap[savedDosha] : 'vata';
    const [activeDoshaTab, setActiveDoshaTab] = useState<'vata' | 'pitta' | 'kapha'>(defaultDosha);

    // Sync if saving dosha happens after component mount
    useEffect(() => {
        if (savedDosha && doshaMap[savedDosha]) {
            setActiveDoshaTab(doshaMap[savedDosha]);
        }
    }, [savedDosha]);

    const activeStrategy = STRATEGIES.find(s => s.dosha === activeDoshaTab);

    return (
        <section className="habits-view fade-in">
            <header className="habits-header">
                <div className="habits-title-group">
                    <h2>Burnout Strategies</h2>
                    <span className="habits-subtitle">Ayurvedic protocols to realign your nervous system</span>
                </div>

                <div className="dosha-selector-group">
                    <select
                        className={`dosha-dropdown ${activeDoshaTab}`}
                        value={activeDoshaTab}
                        onChange={(e) => setActiveDoshaTab(e.target.value as 'vata' | 'pitta' | 'kapha')}
                    >
                        <option value="vata">Vata Profile</option>
                        <option value="pitta">Pitta Profile</option>
                        <option value="kapha">Kapha Profile</option>
                    </select>
                </div>
            </header>

            <div className="strategies-container">
                {activeStrategy && <StrategyCard strategy={activeStrategy} />}
            </div>
        </section>
    );
}
