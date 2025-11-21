const { useState } = React;

const questions = [
        {
            id: 1,
            text: "What is your name?",
            type: "text",
            placeholder: "Enter your full name"
        },
        {
            id: 2,
            text: "What is your Penn email?",
            type: "text",
            placeholder: "Enter your Penn email"
        },
        {
            id: 3,
            text: "What gender do you identify as?",
            type: "multiple-choice",
            options: [
                { label: "Male", value: 0 },
                { label: "Female", value: 1 },
                { label: "Other", value: 2 },
                { label: "Prefer not to say", value: 3 }
            ]
        },
        {
            id: 4,
            text: "What gender would you like to be matched with?",
            type: "multiple-choice",
            options: [
                { label: "Male", value: 0 },
                { label: "Female", value: 1 },
                { label: "Other", value: 2 },
                { label: "Prefer not to say", value: 3 }
            ]
        },
        {
            id: 5,
            text: "What is your major or academic program?",
            type: "multi-select",
            options: [
                { label: "CAS", value: 0 },
                { label: "Wharton", value: 1 },
                { label: "Engineering", value: 2 },
                { label: "Nursing", value: 3 },
                { label: "Other", value: 4 }
            ]
        },
        {
            id: 6,
            text: "What is your year at Penn?",
            type: "multiple-choice",
            options: [
                { label: "Freshman", value: 0 },
                { label: "Sophomore", value: 1 },
                { label: "Junior", value: 2 },
                { label: "Senior", value: 3 }
            ]
        },
        {
            id: 7,
            text: "What is your preferred year for your match?",
            type: "multi-select",
            options: [
                { label: "Freshman", value: 0 },
                { label: "Sophomore", value: 1 },
                { label: "Junior", value: 2 },
                { label: "Senior", value: 3 }
            ]
        },
        {
            id: 8,
            text: "What is your race/ethnicity? (Select all that apply)",
            type: "multi-select",
            options: [
                { label: "Asian (e.g., East Asian, South Asian, Southeast Asian)", value: 0 },
                { label: "Black or African American", value: 1 },
                { label: "Hispanic or Latino/a/x", value: 2 },
                { label: "Middle Eastern or North African", value: 3 },
                { label: "Native American or Alaska Native", value: 4 },
                { label: "Native Hawaiian or Other Pacific Islander", value: 5 },
                { label: "White", value: 6 },
                { label: "Prefer not to say", value: 7 }
            ]
        },
        {
            id: 9,
            text: "Do you have a preference regarding your match's race/ethnicity?",
            type: "multi-select",
            options: [
                { label: "Asian (e.g., East Asian, South Asian, Southeast Asian)", value: 0 },
                { label: "Black or African American", value: 1 },
                { label: "Hispanic or Latino/a/x", value: 2 },
                { label: "Middle Eastern or North African", value: 3 },
                { label: "Native American or Alaska Native", value: 4 },
                { label: "Native Hawaiian or Other Pacific Islander", value: 5 },
                { label: "White", value: 6 },
                { label: "NO PREFERENCE", value: 7 }
            ]
        },
        {
            id: 10,
            text: "How often do you actually enjoy big social events (parties, mixers, Greek life events, etc.)?",
            subtext: "1 = I'd rather stay home │ 10 = I thrive in them",
            type: "multiple-choice",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "7", value: 7 },
                { label: "8", value: 8 },
                { label: "9", value: 9 },
                { label: "10", value: 10 }
            ]
        },
        {
            id: 11,
            text: "How much daily communication do you prefer in a relationship?",
            subtext: "1 = A few texts a week │ 10 = Talk throughout the whole day",
            type: "multiple-choice",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "7", value: 7 },
                { label: "8", value: 8 },
                { label: "9", value: 9 },
                { label: "10", value: 10 }
            ]
        },
        {
            id: 12,
            text: "How planned do you like your life to be?",
            subtext: "1 = Go with the flow │ 10 = I use Google Calendar for my emotions",
            type: "multiple-choice",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "7", value: 7 },
                { label: "8", value: 8 },
                { label: "9", value: 9 },
                { label: "10", value: 10 }
            ]
        },
        {
            id: 13,
            text: "How important is having a romantic relationship in your life right now?",
            subtext: "1 = Not a priority │ 10 = I'd fill out this form twice if I could",
            type: "multiple-choice",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "7", value: 7 },
                { label: "8", value: 8 },
                { label: "9", value: 9 },
                { label: "10", value: 10 }
            ]
        },
        {
            id: 14,
            text: "How much does physical attraction matter to you at the start of a relationship?",
            subtext: "1 = Personality first │ 10 = If there's no spark, it's a no",
            type: "multiple-choice",
            options: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "7", value: 7 },
                { label: "8", value: 8 },
                { label: "9", value: 9 },
                { label: "10", value: 10 }
            ]
        }
    ];

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleAnswer = (answer) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestion].id]: answer
        }));
        // Clear email error when typing
        if (questions[currentQuestion].id === 2) {
            setEmailError("");
        }
    };

    const handleMultiSelect = (option) => {
        const currentAnswers = answers[questions[currentQuestion].id] || [];
        let newAnswers;
        
        if (currentAnswers.includes(option)) {
            // Remove option if already selected
            newAnswers = currentAnswers.filter(item => item !== option);
        } else {
            // Add option if not selected
            newAnswers = [...currentAnswers, option];
        }
        
        setAnswers({
            ...answers,
            [questions[currentQuestion].id]: newAnswers
        });
    };

    const handleNext = async () => {
        // Validate email if on question 2
        if (questions[currentQuestion].id === 2) {
            const email = answers[2];
            if (!email || !email.endsWith("@upenn.edu")) {
                setEmailError("Please enter a valid Penn email ending in @upenn.edu");
                return;
            }
            setEmailError("");
        }
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Submit to database before showing completion page
            await submitToDatabase();
            setCompleted(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            // Go back to home page if on first question
            setStarted(false);
        }
    };

    const submitToDatabase = async () => {
        try {
            const submissionData = {
                name: answers[1],
                penn_email: answers[2],
                gender: answers[3],
                preferred_gender: answers[4],
                schools: Array.isArray(answers[5]) ? answers[5].join(',') : answers[5],
                year_at_penn: answers[6],
                preferred_match_years: Array.isArray(answers[7]) ? answers[7].join(',') : answers[7],
                race_ethnicity: Array.isArray(answers[8]) ? answers[8].join(',') : answers[8],
                preferred_match_race_ethnicity: Array.isArray(answers[9]) ? answers[9].join(',') : answers[9],
                social_events_enjoyment: answers[10],
                communication_preference: answers[11],
                planning_style: answers[12],
                relationship_importance: answers[13],
                physical_attraction_priority: answers[14]
            };

            const response = await fetch('http://localhost:3000/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            const result = await response.json();
            console.log('✅ Submitted successfully!', result);
        } catch (error) {
            console.error('❌ Error submitting:', error);
            alert('There was an error submitting your responses. Please try again.');
        }
    };

    const WelcomePage = () => (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="main-title gaegu-bold">💕 PENN MARRIAGE PACT💕</h1>
                <p className="subtitle gaegu-regular">
                    Find your perfect campus match through our scientifically unscientific questionnaire!
                </p>
                <div className="heart-divider">
                    <span>❤️</span>
                    <span>💖</span>
                    <span>💕</span>
                    <span>💖</span>
                    <span>❤️</span>
                </div>
                <button className="start-button gaegu-bold" onClick={() => setStarted(true)}>
                    Start Your Love Journey ✨
                </button>
            </div>
        </div>
    );

    const QuestionPage = () => (
        <div className="question-container">
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
            <div className="progress-text gaegu-regular">
                Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <div className="question-card">
                <h2 className="question-text gaegu-bold">
                    {questions[currentQuestion].text}
                </h2>
                
                {questions[currentQuestion].type === "text" ? (
                    <div className="text-input-container">
                        <input
                            type={questions[currentQuestion].id === 2 ? "email" : "text"}
                            className={`text-input gaegu-regular ${emailError && questions[currentQuestion].id === 2 ? 'input-error' : ''}`}
                            placeholder={questions[currentQuestion].placeholder}
                            value={answers[questions[currentQuestion].id] || ""}
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                        {emailError && questions[currentQuestion].id === 2 && (
                            <p className="error-message gaegu-regular">{emailError}</p>
                        )}
                    </div>
                ) : questions[currentQuestion].type === "multi-select" ? (
                    <div>
                        <p className="multi-select-hint gaegu-regular">Select all that apply:</p>
                        {questions[currentQuestion].subtext && (
                            <p className="question-subtext gaegu-regular">{questions[currentQuestion].subtext}</p>
                        )}
                        <div className="options-container">
                            {questions[currentQuestion].options.map((option, index) => {
                                const currentAnswers = answers[questions[currentQuestion].id] || [];
                                const isSelected = currentAnswers.includes(option.value);
                                return (
                                    <button
                                        key={index}
                                        className={`option-button gaegu-regular ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleMultiSelect(option.value)}
                                    >
                                        <span className="checkbox">{isSelected ? '✓ ' : ''}</span>
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div>
                        {questions[currentQuestion].subtext && (
                            <p className="question-subtext gaegu-regular">{questions[currentQuestion].subtext}</p>
                        )}
                        <div className="options-container">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-button gaegu-regular ${
                                        answers[questions[currentQuestion].id] === option.value ? 'selected' : ''
                                    }`}
                                    onClick={() => handleAnswer(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="navigation-buttons">
                    <button 
                        className="nav-button gaegu-bold" 
                        onClick={handlePrevious}
                    >
                        ← Previous
                    </button>
                    <button 
                        className="nav-button next gaegu-bold" 
                        onClick={handleNext}
                        disabled={
                            questions[currentQuestion].type === "multi-select"
                                ? !answers[questions[currentQuestion].id] || answers[questions[currentQuestion].id].length === 0
                                : questions[currentQuestion].type === "text"
                                    ? !answers[questions[currentQuestion].id]
                                    : answers[questions[currentQuestion].id] === undefined
                        }
                    >
                        {currentQuestion === questions.length - 1 ? 'Finish 💕' : 'Next →'}
                    </button>
                </div>
            </div>
        </div>
    );

    const CompletionPage = () => (
        <div className="completion-container">
            <div className="completion-content">
                <h1 className="completion-title gaegu-bold">
                    🎉 You're All Done! 🎉
                </h1>
                <p className="completion-text gaegu-regular">
                    Thank you for completing the Penn Marriage Pact questionnaire!
                </p>
                <p className="completion-text gaegu-regular">
                    We're processing your answers to find your perfect match...
                </p>
                <div className="heart-animation">
                    💕 💖 ❤️ 💗 💓 💕 💖 ❤️ 💗 💓
                </div>
                <p className="completion-subtext gaegu-regular">
                    Check your email for your match results!
                </p>
            </div>
        </div>
    );

    return (
        <div className="app">
            <header className="header">
                <img src="assets/plaid banner.jpg" alt="Penn Marriage Pact Banner" className="banner" />
            </header>
            
            <main className="main-content">
                {!started ? (
                    WelcomePage()
                ) : completed ? (
                    CompletionPage()
                ) : (
                    QuestionPage()
                )}
            </main>
            
            <footer className="footer gaegu-regular">
                Made with 💕 for Penn students
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

