export type Event = {
    id: string;
    title?: string;
    summary?: string;
    type?: string;
    durationMinutes?: number;
    intensity?: 'High' | 'Medium' | 'Low';
    timestamp?: string;
    [key: string]: any; // Allow raw Google calendar properties
};

// 1. THE BRIDGE: Normalizes mixed event data
export const normalizeEvents = (rawEvents: any[]) => {
    return rawEvents.map(event => {
        // If it came from your Quick Add Modal, it already has exactly what we need
        if (event.intensity && event.type && event.durationMinutes) {
            return event;
        }

        // Otherwise, it's a raw Google Calendar event, so we parse it from the title
        const title = (event.summary || event.title || '').toLowerCase();

        // Fallback duration if start/end times are messy
        let durationMinutes = event.durationMinutes || 60;

        let type = 'Admin';
        let intensity = 'Low';

        // Keyword matching for Google Calendar
        if (title.match(/sync|meeting|call|standup|1:1/)) {
            type = 'Meeting';
            intensity = title.includes('review') || title.includes('urgent') ? 'High' : 'Medium';
        } else if (title.match(/code|design|deep work|sprint|review|debug/)) {
            type = 'Deep Work';
            intensity = 'High';
        } else if (title.match(/break|lunch|walk|meditate/)) {
            type = 'Break';
            intensity = 'Low';
        }

        return { ...event, type, intensity, durationMinutes };
    });
};

// 2. THE CALCULATOR: Spits out the final 0-100 score
export const calculateScore = (rawEvents: any[], userDosha = 'Vata') => {
    // First, clean the data using the bridge
    const cleanEvents = normalizeEvents(rawEvents);

    let score = 15; // Base score so it's never 0

    cleanEvents.forEach(event => {
        // Basic Intensity Penalties
        if (event.intensity === 'High') score += 15;
        if (event.intensity === 'Medium') score += 10;
        if (event.intensity === 'Low') score += 5;

        // Time Penalty
        if (event.durationMinutes > 90) score += 10;

        // THE ANCIENT WISDOM LOGIC (The Hackathon Flex)
        // Vata (Your profile) burns out from too many scattered meetings
        if (userDosha === 'Vata' && event.type === 'Meeting') score += 10;

        // Pitta burns out from long, high-intensity deep work
        if (userDosha === 'Pitta' && event.type === 'Deep Work' && event.intensity === 'High') score += 10;

        // Kapha stagnates from long, low-intensity admin blocks
        if (userDosha === 'Kapha' && event.type === 'Admin' && event.durationMinutes > 60) score += 10;
    });

    // Cap at 100
    const finalScore = Math.min(score, 100);

    // Determine UI Colors for your Dashboard
    let uiColor = 'bg-emerald-500';
    let textColor = 'text-emerald-500';
    let statusText = 'Optimal energy balance. Keep it up.';

    if (finalScore >= 50 && finalScore < 75) {
        uiColor = 'bg-amber-500';
        textColor = 'text-amber-500';
        statusText = 'Energy dipping. Schedule a short break soon.';
    } else if (finalScore >= 75) {
        uiColor = 'bg-red-500';
        textColor = 'text-red-500';
        statusText = 'Critical zone approaching. Intervention recommended.';
    }

    return { percentage: finalScore, uiColor, textColor, statusText };
};

// 3. THE INSIGHTS GENERATOR: Takes raw events, calculates score, and generates dynamic Ayurvedic insights
export const generateInsights = (rawEvents: any[], userDosha = 'Vata') => {
    const { percentage } = calculateScore(rawEvents, userDosha);
    const cleanEvents = normalizeEvents(rawEvents);

    // Pranic Alignment (Inverse of Burnout Percentage)
    const alignmentScore = 100 - percentage;
    let alignmentColorClass = 'text-emerald-500';
    let alignmentChartColor = 'emerald';
    let alignmentStatus = 'Optimal Biological Alignment.';
    let alignmentSubtext = 'Your schedule is highly harmonious with your natural energy rhythms today.';

    if (alignmentScore < 50) {
        alignmentColorClass = 'text-red-500';
        alignmentChartColor = 'red';
        alignmentStatus = 'Severe Energy Misalignment.';
        alignmentSubtext = 'Your tasks are entirely out of sync with your biological clock. Burnout risk is very high.';
    } else if (alignmentScore < 75) {
        alignmentColorClass = 'text-amber-500';
        alignmentChartColor = 'amber';
        alignmentStatus = `${alignmentScore}% Biological Alignment.`;

        // Calculate some simple metric to show in the subtext
        const highIntensityCount = cleanEvents.filter(e => e.intensity === 'High').length;
        if (highIntensityCount > 0) {
            alignmentSubtext = `You have ${highIntensityCount} high-intensity tasks scheduled during your natural energy slumps.`;
        } else {
            alignmentSubtext = 'Your energy is dipping. Consider rescheduling some heavier tasks.';
        }
    }

    // Find the Primary Drainer
    let primaryDrainer = 'No Significant Drainers';
    let drainerSubtext = 'Your schedule looks clear. Keep maintaining this balanced pace.';

    // Group by type and calculate total duration
    const eventStats = cleanEvents.reduce((acc, event) => {
        if (!acc[event.type]) {
            acc[event.type] = { count: 0, duration: 0, highIntensity: 0 };
        }
        acc[event.type].count++;
        acc[event.type].duration += event.durationMinutes;
        if (event.intensity === 'High') acc[event.type].highIntensity++;
        return acc;
    }, {} as Record<string, { count: number, duration: number, highIntensity: number }>);

    let maxType = '';
    let maxMetric = 0;

    // Determine the biggest drainer based on Dosha weaknesses defined in scoring
    Object.entries(eventStats).forEach(([type, stats]: [string, any]) => {
        let metric = 0;
        if (userDosha === 'Vata' && type === 'Meeting') metric = stats.count * 10;
        else if (userDosha === 'Pitta' && type === 'Deep Work') metric = stats.highIntensity * 10;
        else if (userDosha === 'Kapha' && type === 'Admin') metric = stats.duration > 60 ? 10 : 0;
        else metric = stats.duration; // Fallback generic metric

        if (metric > maxMetric) {
            maxMetric = metric;
            maxType = type;
        }
    });

    if (maxType) {
        primaryDrainer = maxType === 'Meeting' ? 'High-Intensity Meetings.'
            : maxType === 'Deep Work' ? 'Prolonged Deep Work.'
                : maxType === 'Admin' ? 'Stagnant Admin Blocks.'
                    : `${maxType} Overload.`;

        // Calculate a rough percentage of burnout caused by this
        const estimatedImpact = Math.min(Math.round(((maxMetric / percentage) * 100) || 0), 100);

        if (userDosha === 'Vata' && maxType === 'Meeting') {
            drainerSubtext = `As a Vata profile, back-to-back meetings disrupt your nervous system faster than deep work. This is causing ${estimatedImpact > 0 ? estimatedImpact + '%' : 'a large portion'} of your current burnout threshold.`;
        } else if (userDosha === 'Pitta' && maxType === 'Deep Work') {
            drainerSubtext = `As a Pitta profile, hyper-focusing without breaks overheats your system. Prolonged intensity is causing ${estimatedImpact > 0 ? estimatedImpact + '%' : 'a large portion'} of your current burnout threshold.`;
        } else if (userDosha === 'Kapha' && maxType === 'Admin') {
            drainerSubtext = `As a Kapha profile, long sedentary blocks of low-intensity work cause stagnation. This is causing ${estimatedImpact > 0 ? estimatedImpact + '%' : 'a large portion'} of your current burnout threshold.`;
        } else {
            drainerSubtext = `This activity is the primary contributor to your current burnout threshold.`;
        }
    }

    // AI Recommendation (Pulling logic conceptually from Habits.tsx)
    let aiRecTitle = 'Action Required for Tomorrow:';
    let aiRecText = 'Take a 15-minute nature walk to reset your nervous system.';
    let aiRecButtonText = 'Schedule Break';

    if (userDosha === 'Vata') {
        aiRecText = 'Your nervous system is overwhelmed by context-switching. Block 2:00 PM to 4:00 PM strictly for heads-down, solo creative work to pacify your Vata energy.';
        aiRecButtonText = 'Auto-Schedule Deep Work';
        if (percentage >= 75) aiRecText = 'Critical Vata imbalance. We strongly recommend trying a 15-minute Yoga Nidra session tonite to ground your nervous system.';
    } else if (userDosha === 'Pitta') {
        aiRecText = 'Heat is building up from intense focusing. Step away and practice Trataka (Visual Resting) or take a cool walk near water.';
        aiRecButtonText = 'Auto-Schedule Cooling Break';
        if (percentage >= 75) aiRecText = 'Critical Pitta imbalance. Practice Sheetali Pranayama (Cooling Breath) immediately to lower your internal temperature.';
    } else if (userDosha === 'Kapha') {
        aiRecText = 'Lethargy is setting in from prolonged stagnation. Break up your admin blocks with 5 minutes of Micro-HIIT or brisk movement.';
        aiRecButtonText = 'Auto-Schedule Movement Block';
        if (percentage >= 75) aiRecText = 'Critical Kapha imbalance. Shock your system out of lethargy with cold splashes of water or Garshana (dry brushing).';
    }

    let aiSummary = {
        text: 'Your energy is currently balanced.',
        color: '#10b981',
        highlight: 'Sattva',
        suffix: ''
    };
    let rituals = [
        { icon: '💧', label: 'Hydrate' },
        { icon: '🧘', label: 'Meditate' }
    ];

    if (userDosha === 'Vata') {
        if (percentage > 50) {
            aiSummary = { text: 'Your energy is currently trending towards ', highlight: 'High Vata', color: '#60a5fa', suffix: ' (Movement). Schedule grounding activities.' };
            rituals = [{ icon: '🧘', label: 'Grounding' }, { icon: '🍵', label: 'Warm Tea' }];
        } else {
            aiSummary = { text: 'Your Vata energy is ', highlight: 'Stable', color: '#34d399', suffix: '. Keep maintaining rhythmic routines.' };
        }
    } else if (userDosha === 'Pitta') {
        if (percentage > 50) {
            aiSummary = { text: 'Your energy is currently trending towards ', highlight: 'High Pitta', color: '#f97316', suffix: ' (Heat). Schedule cooling activities.' };
            rituals = [{ icon: '💧', label: 'Hydrate' }, { icon: '🌬️', label: 'Cooling Breath' }];
        } else {
            aiSummary = { text: 'Your Pitta energy is ', highlight: 'Focused', color: '#34d399', suffix: '. Excellent time for deep execution.' };
        }
    } else if (userDosha === 'Kapha') {
        if (percentage > 50) {
            aiSummary = { text: 'Your energy is currently trending towards ', highlight: 'High Kapha', color: '#a3e635', suffix: ' (Lethargy). Schedule stimulating activities.' };
            rituals = [{ icon: '🏃', label: 'Move Body' }, { icon: '🔥', label: 'Warm Spices' }];
        } else {
            aiSummary = { text: 'Your Kapha energy is ', highlight: 'Grounded', color: '#34d399', suffix: '. Perfect foundation for steady work.' };
        }
    }

    return {
        alignment: {
            percentage: alignmentScore,
            colorClass: alignmentColorClass,
            chartColor: alignmentChartColor,
            status: alignmentStatus,
            subtext: alignmentSubtext
        },
        drainer: {
            title: primaryDrainer,
            subtext: drainerSubtext
        },
        recommendation: {
            title: aiRecTitle,
            text: aiRecText,
            buttonText: aiRecButtonText
        },
        aiSummary,
        rituals
    };
};
