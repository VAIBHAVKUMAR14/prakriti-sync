import { useAuth } from '../AuthContext';

interface Props {
    onClose: () => void;
}

const movementConfig = {
    Vata: {
        title: 'Seated Forward Fold',
        goal: 'Grounds the nervous system',
        desc: 'Plant feet flat. Exhale and fold your torso over your legs. Let your head hang heavy to release chaotic Vata energy.'
    },
    Pitta: {
        title: 'Neck & Shoulder Release',
        goal: 'Releases trapped heat & tension',
        desc: 'Drop right ear to right shoulder. Extend left arm toward the floor. Breathe into the side of the neck to release frustration.'
    },
    Kapha: {
        title: 'Brisk Seated Twists',
        goal: 'Breaks physical lethargy',
        desc: 'Inhale tall, exhale and forcefully twist right, grabbing your chair. Alternate quickly to stimulate circulation.'
    }
};

export function DeskMovementModal({ onClose }: Props) {
    const { savedDosha } = useAuth();
    const activeDosha = savedDosha || 'Vata';
    const config = movementConfig[activeDosha as keyof typeof movementConfig];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm fade-in">
            <div className="bg-[#1A1C19] border border-gray-800 rounded-xl p-8 w-[400px] text-center relative shadow-2xl">

                <h3 className="text-emerald-400 text-xl font-bold tracking-wide mb-1">{config.title}</h3>
                <p className="text-gray-400 italic text-sm mb-4">{config.goal}</p>

                <div className="h-40 w-full bg-[#2A2D2A] rounded-lg mb-6 flex items-center justify-center text-gray-500 overflow-hidden relative group cursor-pointer border border-gray-800">
                    <span className="z-10 bg-black/50 px-3 py-1 rounded shadow-lg group-hover:bg-black/70 transition-colors">▶ Play Demo</span>
                    <img
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=200"
                        alt="Movement Demo"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-40"
                    />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-8">{config.desc}</p>

                <button
                    onClick={onClose}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-semibold py-2.5 rounded-lg transition-colors"
                >
                    Complete Movement
                </button>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
