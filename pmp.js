/**
 * Penn Marriage Pact - Frontend Application
 * 
 * A React-based questionnaire for matching Penn students.
 * Built using vanilla React (no JSX transpilation needed - uses Babel standalone).
 * 
 * Architecture:
 * - Uses React hooks (useState) for state management
 * - Single-page application with 3 main views: Welcome, Questions, Completion
 * - Submits responses to backend API at http://localhost:3000
 * 
 * Data Flow:
 * 1. User answers questions → stored in `answers` state object
 * 2. On final question → submitToDatabase() sends data to API
 * 3. On success → shows completion page
 */

const { useState } = React;

/**
 * Questions Array
 * 
 * Defines all 22 survey questions with their types and options.
 * 
 * Question Types:
 * - "text": Free-form text input
 * - "multiple-choice": Single selection from options
 * - "multi-select": Multiple selections allowed (checkboxes)
 * 
 * Note: Question IDs map to the answers object (answers[id])
 */
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
        },
        {
            id: 15,
            text: "You spot your match walking down Locust Walk. What do you do?",
            type: "multiple-choice",
            options: [
                { label: "Wave enthusiastically and stop to talk", value: 0 },
                { label: "Panic, put AirPods in, pretend not to see", value: 1 },
                { label: "Cross to the other side of Locust like it's a one-way street", value: 2 },
                { label: "Send a \"lol just saw you on Locust\" text 3 hours later", value: 3 },
                { label: "Text your friend group first", value: 4 }
            ]
        },
        {
            id: 16,
            text: "Open to polygamy?",
            type: "multiple-choice",
            options: [
                { label: "Yes ;)", value: 0 },
                { label: "No", value: 1 }
            ]
        },
        {
            id: 17,
            text: "What's your love language? (Select all that apply)",
            type: "multi-select",
            options: [
                { label: "Acts of service", value: 0 },
                { label: "Gift giving", value: 1 },
                { label: "Quality time", value: 2 },
                { label: "Physical touch", value: 3 },
                { label: "Words of affirmation", value: 4 }
            ]
        },
        {
            id: 18,
            text: "What's your ideal type's love language? (Select all that apply)",
            type: "multi-select",
            options: [
                { label: "Acts of service", value: 0 },
                { label: "Gift giving", value: 1 },
                { label: "Quality time", value: 2 },
                { label: "Physical touch", value: 3 },
                { label: "Words of affirmation", value: 4 }
            ]
        },
        {
            id: 19,
            text: "What's your dominant love language at Penn?",
            type: "multiple-choice",
            options: [
                { label: "Walking them back from DRL after 11pm", value: 0 },
                { label: "Sending them your pset solutions (occasionally)", value: 1 },
                { label: "Saving them a seat in lecture", value: 2 },
                { label: "Grabbing Wawa for them at 1:30am", value: 3 },
                { label: "Adding them as \"+1\" to every free-food event", value: 4 }
            ]
        },
        {
            id: 20,
            text: "Emotionally available?",
            type: "multiple-choice",
            options: [
                { label: "Fully available, healed, and ready", value: 0 },
                { label: "Emotionally available, time unavailable", value: 1 },
                { label: "Emotionally unavailable, time very available", value: 2 },
                { label: "\"It's complicated\" (with my coursework)", value: 3 }
            ]
        },
        {
            id: 21,
            text: "How do you usually text in a talking stage?",
            type: "multiple-choice",
            options: [
                { label: "Instant replies (under 5 min, always)", value: 0 },
                { label: "Reply within a few hours, consistently", value: 1 },
                { label: "\"Sorry just saw this\" every 2–3 days", value: 2 },
                { label: "I forget to reply and then send a paragraph apology", value: 3 },
                { label: "I'd rather call than text", value: 4 },
                { label: "Sending random Tiktoks or Reels or GIFs", value: 5 }
            ]
        },
        {
            id: 22,
            text: "Upload a link to your Spotify wrapped that would help us (or your match!) to get to know you better:",
            type: "text",
            placeholder: "Paste your Spotify wrapped link here (optional)"
        }
    ];

/**
 * Main App Component
 * 
 * Manages the entire questionnaire flow and state.
 */
function App() {
    // ========================================
    // State Management
    // ========================================
    
    // Track which question user is currently on (0-based index)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    // Store all answers in an object: { questionId: answer }
    // For multi-select, answers are arrays; for single-choice, they're values
    const [answers, setAnswers] = useState({});
    
    // Control which page is shown
    const [started, setStarted] = useState(false);      // true = show questions, false = show welcome
    const [completed, setCompleted] = useState(false);  // true = show completion page
    
    // Email validation error message
    const [emailError, setEmailError] = useState("");

    // ========================================
    // Event Handlers
    // ========================================
    
    /**
     * Handle single-choice answer selection
     * @param {any} answer - The selected answer value
     */
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

    /**
     * Handle multi-select answer (checkbox-style)
     * Toggles the option on/off in the answer array
     * @param {any} option - The option value to toggle
     */
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

    /**
     * Handle "Next" button click
     * - Validates email on question 2
     * - Moves to next question OR submits if on last question
     */
    const handleNext = async () => {
        // Special validation for email question (question 2)
        if (questions[currentQuestion].id === 2) {
            const email = answers[2];
            if (!email || !email.endsWith("upenn.edu")) {
                setEmailError("Please enter a valid Penn email ending in upenn.edu");
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

    /**
     * Handle "Previous" button click
     * Goes back to previous question, or to welcome page if on first question
     */
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            // Go back to home page if on first question
            setStarted(false);
        }
    };

    /**
     * Submit all answers to the backend API
     * 
     * Process:
     * 1. Transform answers object into the format expected by backend
     * 2. Handle multi-select answers (convert arrays to comma-separated strings)
     * 3. Expand "NO PREFERENCE" selections to include all options
     * 4. Send POST request to API
     * 5. Handle success/error responses
     */
    const submitToDatabase = async () => {
        try {
            console.log('📋 All answers:', answers);
            
            /**
             * Helper function to expand "no preference" selections
             * When user selects "NO PREFERENCE" for race/ethnicity,
             * expand it to include all possible values for better matching
             */
            const expandNoPreference = (answerArray, questionId) => {
                if (!Array.isArray(answerArray)) return answerArray;
                
                // Question 9: preferred race/ethnicity - if 7 (NO PREFERENCE) is selected, replace with all options
                if (questionId === 9 && answerArray.includes(7)) {
                    return [0, 1, 2, 3, 4, 5, 6, 7];
                }
                
                return answerArray;
            };
            
            // Transform answers object into backend-compatible format
            // Maps question IDs to field names, handles arrays vs. single values
            const submissionData = {
                name: answers[1],
                penn_email: answers[2],
                gender: answers[3],
                preferred_gender: answers[4],
                schools: Array.isArray(answers[5]) ? answers[5].join(',') : answers[5],
                year_at_penn: answers[6],
                preferred_match_years: Array.isArray(answers[7]) ? answers[7].join(',') : answers[7],
                race_ethnicity: Array.isArray(answers[8]) ? answers[8].join(',') : answers[8],
                preferred_match_race_ethnicity: Array.isArray(answers[9]) ? expandNoPreference(answers[9], 9).join(',') : answers[9],
                social_events_enjoyment: answers[10],
                communication_preference: answers[11],
                planning_style: answers[12],
                relationship_importance: answers[13],
                physical_attraction_priority: answers[14],
                locust_walk_reaction: answers[15],
                open_to_polygamy: answers[16],
                love_language: Array.isArray(answers[17]) ? answers[17].join(',') : answers[17],
                ideal_love_language: Array.isArray(answers[18]) ? answers[18].join(',') : answers[18],
                penn_love_language: answers[19],
                emotionally_available: answers[20],
                texting_style: answers[21],
                spotify_wrapped_link: answers[22] || ""
            };

            console.log('📤 Sending submission data:', submissionData);
            console.log('🌐 Fetching: http://localhost:3000/api/submissions');

            // Send POST request to backend API
            const response = await fetch('http://localhost:3000/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            console.log('📥 Response status:', response.status);

            // Check if request was successful (status 200-299)
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Response error:', errorText);
                throw new Error('Submission failed: ' + response.status);
            }

            const result = await response.json();
            console.log('✅ Submitted successfully!', result);
        } catch (error) {
            console.error('❌ Error submitting:', error);
            console.error('❌ Error type:', error.constructor.name);
            console.error('❌ Error message:', error.message);
            console.error('❌ Full error:', error);
            alert('There was an error submitting your responses. Please try again.');
        }
    };

    // ========================================
    // Page Components
    // ========================================
    
    /**
     * Welcome Page
     * First screen users see with title and start button
     */
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

    /**
     * Question Page
     * Displays current question and handles different question types
     */
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

    /**
     * Completion Page
     * Success screen shown after submission
     */
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

    // ========================================
    // Main Render
    // ========================================
    
    // Conditionally render pages based on state
    return (
        <div className="app">
            <header className="header">
                <img src="assets/plaid banner.jpg" alt="Penn Marriage Pact Banner" className="banner" />
            </header>
            
            <main className="main-content">
                {/* Show appropriate page based on application state */}
                {!started ? (
                    WelcomePage()           // Show welcome screen initially
                ) : completed ? (
                    CompletionPage()        // Show completion after submission
                ) : (
                    QuestionPage()          // Show questions during survey
                )}
            </main>
            
            <footer className="footer gaegu-regular">
                Made with 💕 for Penn students
            </footer>
        </div>
    );
}

// ========================================
// Application Entry Point
// ========================================

// Mount React app to the DOM element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

