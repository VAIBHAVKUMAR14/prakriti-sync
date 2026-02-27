import { useState } from 'react';
import { QUIZ_QUESTIONS, DOSHA_RESULTS, DoshaType } from '../QuizData';
import { useAuth } from '../AuthContext';
import './DoshaQuiz.css';

interface Props {
    onClose: () => void;
}

export function DoshaQuiz({ onClose }: Props) {
    const { saveDoshaResult } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [answers, setAnswers] = useState<DoshaType[]>([]);

    const getDominantDosha = (currentAnswers: DoshaType[]): DoshaType => {
        const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
        currentAnswers.forEach(ans => {
            if (ans) counts[ans]++;
        });

        let max = -1;
        let dominant: DoshaType = 'Vata';
        for (const [dosha, score] of Object.entries(counts)) {
            if (score > max) {
                max = score;
                dominant = dosha as DoshaType;
            }
        }
        return dominant;
    };

    const handleAnswer = (dosha: DoshaType) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = dosha;
        setAnswers(newAnswers);

        const nextQ = currentQuestion + 1;
        setCurrentQuestion(nextQ);

        // Save immediately when finishing the final question
        if (nextQ >= QUIZ_QUESTIONS.length) {
            saveDoshaResult(getDominantDosha(newAnswers));
        }
    };

    const goBack = () => {
        if (currentQuestion >= 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(-1);
        setAnswers([]);
    };

    // Welcome View
    if (currentQuestion === -1) {
        return (
            <div className="quiz-wrapper">
                <button className="btn-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="quiz-card welcome-view">
                    <h2>Rapid Dosha Diagnostic</h2>
                    <p>Discover your primary Ayurvedic mind-body archetype to unlock your personalized productivity plan.</p>
                    <div className="quiz-meta">
                        <span>⏱️ 3 Minutes</span>
                        <span>🧠 10 Questions</span>
                    </div>
                    <button className="btn-primary start-btn" onClick={() => setCurrentQuestion(0)}>
                        Begin Diagnostic
                    </button>
                </div>
            </div>
        );
    }

    // Result View
    if (currentQuestion >= QUIZ_QUESTIONS.length) {
        const finalDosha = getDominantDosha(answers);
        const result = DOSHA_RESULTS[finalDosha];

        return (
            <div className="quiz-wrapper">
                <button className="btn-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="quiz-card result-view">
                    <div className="result-header">
                        <span className="result-label">YOUR DOMINANT DOSHA</span>
                        <h2 className="result-title" style={{ color: result.color }}>{finalDosha}</h2>
                        <p className="result-profile">{result.profile}</p>
                    </div>

                    <div className="result-fix-grid">
                        <div className="fix-card">
                            <div className="fix-icon calendar-icon"></div>
                            <h4>Calendar Strategy</h4>
                            <p>{result.calendarStrategy}</p>
                        </div>
                        <div className="fix-card">
                            <div className="fix-icon intervention-icon"></div>
                            <h4>State-Shift Intervention</h4>
                            <p>{result.intervention}</p>
                        </div>
                        <div className="fix-card">
                            <div className="fix-icon notification-icon"></div>
                            <h4>Notification Style</h4>
                            <p>{result.notificationStyle}</p>
                        </div>
                    </div>

                    <div className="result-actions">
                        <button className="btn-primary" onClick={onClose}>Adopt Your {finalDosha} Strategy</button>
                        <button className="btn-text" onClick={resetQuiz} style={{ marginTop: '1rem' }}>Retake Diagnostic</button>
                    </div>
                </div>
            </div>
        );
    }

    // Question View
    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="quiz-wrapper">
            <button className="btn-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="quiz-card question-view">
                <div className="quiz-progress-container">
                    <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="question-header">
                    <button className="btn-previous" onClick={goBack} aria-label="Previous question" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <span className="part-label" style={{ flex: 1, textAlign: 'center' }}>{question.part}</span>
                    <span className="question-count">{currentQuestion + 1} / {QUIZ_QUESTIONS.length}</span>
                </div>

                <h3 className="question-text">{question.text}</h3>

                <div className="answers-grid">
                    {question.answers.map((answer, idx) => (
                        <button
                            key={idx}
                            className="answer-btn"
                            onClick={() => handleAnswer(answer.dosha)}
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
