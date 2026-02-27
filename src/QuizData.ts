export type DoshaType = 'Vata' | 'Pitta' | 'Kapha';

export interface Answer {
    text: string;
    dosha: DoshaType;
}

export interface Question {
    id: number;
    part: string;
    text: string;
    answers: Answer[];
}

export const QUIZ_QUESTIONS: Question[] = [
    // Part 1: Mind & Focus (Cognitive Patterns)
    {
        id: 1,
        part: "Part 1: Mind & Focus",
        text: "When tackling a new, complex project, your working style is usually:",
        answers: [
            { text: "Jumping between multiple ideas quickly; highly creative but sometimes disorganized.", dosha: 'Vata' },
            { text: "Creating a structured, highly optimized plan and executing it with intense focus.", dosha: 'Pitta' },
            { text: "Taking time to process the requirements fully, then working through it methodically and steadily.", dosha: 'Kapha' }
        ]
    },
    {
        id: 2,
        part: "Part 1: Mind & Focus",
        text: "How does your memory function during a busy workday?",
        answers: [
            { text: "I grasp new concepts instantly, but easily forget details if I'm distracted.", dosha: 'Vata' },
            { text: "I have a sharp, accurate memory, especially for facts, figures, and past mistakes.", dosha: 'Pitta' },
            { text: "It takes me a moment to learn new software or routines, but once I learn it, I never forget it.", dosha: 'Kapha' }
        ]
    },
    {
        id: 3,
        part: "Part 1: Mind & Focus",
        text: "In team meetings or Slack discussions, your communication style is:",
        answers: [
            { text: "Fast, enthusiastic, and prone to going off on tangents.", dosha: 'Vata' },
            { text: "Direct, articulate, debate-oriented, and strictly to the point.", dosha: 'Pitta' },
            { text: "Calm, thoughtful, observant, and speaking only when necessary.", dosha: 'Kapha' }
        ]
    },
    {
        id: 4,
        part: "Part 1: Mind & Focus",
        text: "When dealing with interpersonal conflict at work or a harsh critique, you tend to:",
        answers: [
            { text: "Overthink the situation, worry, and second-guess yourself.", dosha: 'Vata' },
            { text: "Become defensive, argumentative, or overly critical in return.", dosha: 'Pitta' },
            { text: "Withdraw, avoid the conflict entirely, or hold onto the resentment quietly.", dosha: 'Kapha' }
        ]
    },
    // Part 2: Energy & Rhythm (Metabolic Patterns)
    {
        id: 5,
        part: "Part 2: Energy & Rhythm",
        text: "If you don't use an alarm clock, your natural sleep pattern is:",
        answers: [
            { text: "Light and easily interrupted; my mind races at night.", dosha: 'Vata' },
            { text: "Sound and moderate; I usually wake up feeling alert and ready to go.", dosha: 'Pitta' },
            { text: "Deep and heavy; I struggle to wake up and feel groggy in the morning.", dosha: 'Kapha' }
        ]
    },
    {
        id: 6,
        part: "Part 2: Energy & Rhythm",
        text: "How do you handle skipping a meal due to back-to-back meetings?",
        answers: [
            { text: "My appetite is irregular anyway, but I might get lightheaded or jittery.", dosha: 'Vata' },
            { text: "I get extremely irritable, lose focus, and feel intensely \"hangry.\"", dosha: 'Pitta' },
            { text: "I can easily skip a meal without much physical or emotional distress.", dosha: 'Kapha' }
        ]
    },
    {
        id: 7,
        part: "Part 2: Energy & Rhythm",
        text: "How would you describe your overall daily stamina?",
        answers: [
            { text: "Erratic. I work in intense, short bursts and crash suddenly.", dosha: 'Vata' },
            { text: "High and sustained. I can power through long days but risk burning out entirely.", dosha: 'Pitta' },
            { text: "Slow to start, but I have incredible endurance once I get into a rhythm.", dosha: 'Kapha' }
        ]
    },
    // Part 3: Physical Baseline (Somatic Indicators)
    {
        id: 8,
        part: "Part 3: Physical Baseline",
        text: "When it comes to the office thermostat or general temperature, you are:",
        answers: [
            { text: "Always cold. I need a sweater even in the summer.", dosha: 'Vata' },
            { text: "Always warm. I overheat easily and prefer cooler environments.", dosha: 'Pitta' },
            { text: "Generally comfortable, but I strongly dislike cold, damp weather.", dosha: 'Kapha' }
        ]
    },
    {
        id: 9,
        part: "Part 3: Physical Baseline",
        text: "Under stress, where do you carry physical tension?",
        answers: [
            { text: "My neck, shoulders, and jaw (teeth grinding).", dosha: 'Vata' },
            { text: "My eyes (strain), or I get stress headaches/acid reflux.", dosha: 'Pitta' },
            { text: "My lower back, or I feel an overall sense of heaviness in my limbs.", dosha: 'Kapha' }
        ]
    },
    {
        id: 10,
        part: "Part 3: Physical Baseline",
        text: "How would you describe your natural physical frame and weight fluctuation?",
        answers: [
            { text: "Naturally thin or wiry; I lose weight easily when stressed.", dosha: 'Vata' },
            { text: "Medium, athletic build; my weight stays relatively consistent.", dosha: 'Pitta' },
            { text: "Solid, sturdy frame; I gain weight easily and find it hard to lose.", dosha: 'Kapha' }
        ]
    }
];

export const DOSHA_RESULTS = {
    Vata: {
        profile: "Creative, visionary, and fast-moving. However, they possess a fragile nervous system that is highly susceptible to digital overwhelm and context-switching fatigue.",
        calendarStrategy: "The app actively blocks back-to-back rapid meetings. It strictly enforces a \"Hard Stop\" at 6:00 PM, as Vatas struggle to wind down.",
        intervention: "If a calendar clash is detected, the app prescribes Grounding. It triggers Yoga Nidra (guided deep rest) or 4-7-8 box breathing.",
        notificationStyle: "Soft, gentle, and spaced out.",
        color: "#8BC34A" // Light, airy color
    },
    Pitta: {
        profile: "Logical, driven, and highly productive. They are the classic \"Type A\" workers. Their burnout risk comes from workaholism, perfectionism, and literal \"overheating\" (frustration).",
        calendarStrategy: "The app protects their 10 AM - 2 PM block (Pitta time) fiercely for deep work, moving superficial check-in meetings to the late afternoon.",
        intervention: "If a calendar clash is detected, the app prescribes Cooling. It triggers Sheetali Pranayama (cooling breath) or Trataka (visual resting to reduce screen eye strain).",
        notificationStyle: "Direct, data-driven, and concise.",
        color: "#E57373" // Fiery color
    },
    Kapha: {
        profile: "Calm, steady, and methodical. They are the anchor of any team. Their burnout doesn't look like panic; it looks like stagnation, procrastination, and lack of motivation.",
        calendarStrategy: "The app pushes their hardest, most complex tasks to the morning (6 AM - 10 AM, Kapha time) to build early momentum before lethargy sets in.",
        intervention: "If a calendar clash is detected, the app prescribes Stimulation. It triggers Surya Bhedana (right-nostril energizing breath) or prompts a 5-minute brisk walk.",
        notificationStyle: "Energetic, encouraging, and action-oriented.",
        color: "#4FC3F7" // Water/earth color
    }
};
