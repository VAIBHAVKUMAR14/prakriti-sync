export type Event = {
    id: string;
    title: string;
    type: string;
    durationMinutes: number;
    intensity: 'High' | 'Medium' | 'Low';
};

export const getBurnoutThreshold = (events: Event[], userDosha: string, sleepHours: number = 6) => {
    let score = 0;

    // Penalize low sleep
    if (sleepHours < 7) {
        score += (7 - sleepHours) * 10;
    }

    events.forEach(event => {
        // Base intensity
        if (event.intensity === 'High') score += 15;
        if (event.intensity === 'Medium') score += 10;
        if (event.intensity === 'Low') score += 5;

        // Long durations
        if (event.durationMinutes > 90) score += 10;
        if (event.durationMinutes > 120) score += 15;

        // Dosha specific triggers
        if (userDosha === 'Pitta' && event.type === 'Deep Work' && event.intensity === 'High') {
            score += 10;
        }
        if (userDosha === 'Vata' && event.type === 'Meeting') {
            score += 5; // Vata gets drained by too much interaction
        }
        if (userDosha === 'Kapha' && event.type === 'Admin' && event.durationMinutes > 60) {
            score += 10; // Kapha gets stagnant with long admin tasks
        }
    });

    const finalScore = Math.min(score, 100);

    // Default: Optimal
    let uiColor = 'var(--accent-mint)';
    let statusText = 'Optimal energy balance.';

    if (finalScore >= 50 && finalScore < 75) {
        uiColor = '#ffb300'; // Warning Amber
        statusText = 'Energy dipping. Schedule a short break soon.';
    } else if (finalScore >= 75) {
        uiColor = '#f44336'; // Critical Red
        statusText = 'Critical zone approaching. Intervention recommended.';
    }

    return { percentage: finalScore, uiColor, statusText };
};
