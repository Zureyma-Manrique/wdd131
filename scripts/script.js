// ===================
// CORE FUNCTIONALITY
// ===================

// Navigation System
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');

function showPage(pageId) {
    // Hide all sections
    pageSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });

    // Save current page to localStorage
    localStorage.setItem('currentPage', pageId);
}

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
    });
});

// Load saved page on startup
document.addEventListener('DOMContentLoaded', () => {
    const savedPage = localStorage.getItem('currentPage') || 'home';
    showPage(savedPage);
});

// ===================
// WELLNESS QUESTIONNAIRE
// ===================

const questions = [
    {
        id: 1,
        text: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
        options: [
            { value: 0, text: "Not at all" },
            { value: 1, text: "Several days" },
            { value: 2, text: "More than half the days" },
            { value: 3, text: "Nearly every day" }
        ]
    },
    {
        id: 2,
        text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
        options: [
            { value: 0, text: "Not at all" },
            { value: 1, text: "Several days" },
            { value: 2, text: "More than half the days" },
            { value: 3, text: "Nearly every day" }
        ]
    },
    {
        id: 3,
        text: "How often have you felt tired or had little energy?",
        options: [
            { value: 0, text: "Not at all" },
            { value: 1, text: "Several days" },
            { value: 2, text: "More than half the days" },
            { value: 3, text: "Nearly every day" }
        ]
    },
    {
        id: 4,
        text: "How often have you had little interest or pleasure in doing things?",
        options: [
            { value: 0, text: "Not at all" },
            { value: 1, text: "Several days" },
            { value: 2, text: "More than half the days" },
            { value: 3, text: "Nearly every day" }
        ]
    },
    {
        id: 5,
        text: "How often have you had trouble concentrating on things?",
        options: [
            { value: 0, text: "Not at all" },
            { value: 1, text: "Several days" },
            { value: 2, text: "More than half the days" },
            { value: 3, text: "Nearly every day" }
        ]
    },
    {
        id: 6,
        text: "How would you rate your stress levels recently?",
        options: [
            { value: 0, text: "Very low" },
            { value: 1, text: "Low" },
            { value: 2, text: "Moderate" },
            { value: 3, text: "High" },
            { value: 4, text: "Very high" }
        ]
    },
    {
        id: 7,
        text: "How often do you engage in activities you enjoy?",
        options: [
            { value: 0, text: "Daily" },
            { value: 1, text: "Several times a week" },
            { value: 2, text: "Once a week" },
            { value: 3, text: "Rarely or never" }
        ]
    },
    {
        id: 8,
        text: "How satisfied are you with your current support system?",
        options: [
            { value: 0, text: "Very satisfied" },
            { value: 1, text: "Somewhat satisfied" },
            { value: 2, text: "Neutral" },
            { value: 3, text: "Somewhat dissatisfied" },
            { value: 4, text: "Very dissatisfied" }
        ]
    }
];

let currentQuestionIndex = 0;
let quizAnswers = {};

function renderQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('questionsContainer');

    const optionsHTML = question.options.map(option => `
                <label class="option">
                    <input type="radio" name="question${question.id}" value="${option.value}">
                    <span>${option.text}</span>
                </label>
            `).join('');

    container.innerHTML = `
                <div class="question">
                    <h4>Question ${index + 1} of ${questions.length}</h4>
                    <p><strong>${question.text}</strong></p>
                    <div class="options">
                        ${optionsHTML}
                    </div>
                </div>
            `;

    // Restore previous answer if exists
    if (quizAnswers[question.id] !== undefined) {
        const radio = container.querySelector(`input[value="${quizAnswers[question.id]}"]`);
        if (radio) radio.checked = true;
    }

    updateProgressBar();
    updateNavigationButtons();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function saveCurrentAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedRadio = document.querySelector(`input[name="question${currentQuestion.id}"]:checked`);

    if (selectedRadio) {
        quizAnswers[currentQuestion.id] = parseInt(selectedRadio.value);
        return true;
    }
    return false;
}

function calculateResults() {
    const totalScore = Object.values(quizAnswers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.value)), 0);

    let resultLevel, resultMessage, recommendations;

    if (totalScore <= maxScore * 0.25) {
        resultLevel = "Low Risk";
        resultMessage = "You're showing signs of good mental well-being! Your responses suggest you're managing stress well and maintaining positive mental health habits.";
        recommendations = [
            "Continue your current self-care practices",
            "Maintain regular exercise and social connections",
            "Keep practicing stress management techniques",
            "Stay aware of any changes in your mood or energy"
        ];
    } else if (totalScore <= maxScore * 0.5) {
        resultLevel = "Mild Concern";
        resultMessage = "You may be experiencing some stress or mild symptoms that could benefit from attention and self-care strategies.";
        recommendations = [
            "Try implementing daily mindfulness or relaxation practices",
            "Ensure you're getting adequate sleep (7-9 hours)",
            "Consider talking to friends, family, or a counselor",
            "Engage in regular physical activity",
            "Limit caffeine and alcohol consumption"
        ];
    } else if (totalScore <= maxScore * 0.75) {
        resultLevel = "Moderate Concern";
        resultMessage = "Your responses suggest you may be experiencing moderate stress or symptoms that could impact your daily life.";
        recommendations = [
            "Consider speaking with a mental health professional",
            "Practice daily stress reduction techniques",
            "Reach out to supportive friends or family members",
            "Maintain a regular sleep schedule",
            "Consider joining a support group",
            "Limit alcohol and avoid recreational drugs"
        ];
    } else {
        resultLevel = "Higher Concern";
        resultMessage = "Your responses indicate you may be experiencing significant distress. It's important to seek professional support.";
        recommendations = [
            "Speak with a mental health professional soon",
            "Contact your healthcare provider",
            "Reach out to trusted friends or family for support",
            "Consider calling a mental health helpline (988)",
            "Avoid alcohol and recreational drugs",
            "If you're having thoughts of self-harm, seek immediate help"
        ];
    }

    return { totalScore, maxScore, resultLevel, resultMessage, recommendations };
}

function showResults() {
    const results = calculateResults();
    const resultsContainer = document.getElementById('quizResults');
    const resultsContent = document.getElementById('resultsContent');

    const recommendationsHTML = results.recommendations.map(rec => `<li>${rec}</li>`).join('');

    resultsContent.innerHTML = `
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-color); font-size: 1.5rem;">${results.resultLevel}</h4>
                    <p><strong>Score: ${results.totalScore}/${results.maxScore}</strong></p>
                </div>
                
                <p style="margin-bottom: 1.5rem;">${results.resultMessage}</p>
                
                <h4 style="color: var(--secondary-color); margin-bottom: 1rem;">Recommended Actions:</h4>
                <ul style="margin-left: 1rem; line-height: 1.6;">
                    ${recommendationsHTML}
                </ul>
                
                <div style="margin-top: 2rem; padding: 1rem; background: rgba(220,53,69,0.1); border-radius: 8px; border-left: 4px solid #DC3545;">
                    <p><strong>Important:</strong> This questionnaire is not a diagnostic tool. If you're experiencing persistent distress or having thoughts of self-harm, please seek immediate professional help by calling 988 or visiting your nearest emergency room.</p>
                </div>
            `;

    document.getElementById('wellnessQuiz').style.display = 'none';
    resultsContainer.style.display = 'block';

    // Save results to localStorage
    const resultData = {
        date: new Date().toISOString(),
        score: results.totalScore,
        level: results.resultLevel,
        answers: quizAnswers
    };

    let savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    savedResults.push(resultData);
    localStorage.setItem('quizResults', JSON.stringify(savedResults));
}

// Quiz Event Listeners
document.getElementById('nextBtn').addEventListener('click', () => {
    if (saveCurrentAnswer()) {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }
    } else {
        alert('Please select an answer before continuing.');
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(currentQuestionIndex);
    }
});

document.getElementById('wellnessQuiz').addEventListener('submit', (e) => {
    e.preventDefault();
    if (saveCurrentAnswer()) {
        showResults();
    } else {
        alert('Please select an answer before submitting.');
    }
});

document.getElementById('retakeBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    quizAnswers = {};
    document.getElementById('wellnessQuiz').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    renderQuestion(currentQuestionIndex);
});

// Initialize quiz
if (document.getElementById('questionsContainer')) {
    renderQuestion(currentQuestionIndex);
}

// ===================
// BREATHING EXERCISE
// ===================

let breathingInterval;
let isBreathing = false;

function startBreathingExercise() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const btn = document.getElementById('breathingBtn');

    if (!isBreathing) {
        isBreathing = true;
        btn.textContent = 'Stop Exercise';

        let phase = 'inhale'; // inhale, hold, exhale, hold
        let count = 4;

        function updateBreathing() {
            if (phase === 'inhale') {
                text.textContent = `Breathe In (${count})`;
                circle.classList.add('inhale');
                circle.classList.remove('exhale');

                if (count === 0) {
                    phase = 'hold1';
                    count = 2;
                } else {
                    count--;
                }
            } else if (phase === 'hold1') {
                text.textContent = `Hold (${count})`;

                if (count === 0) {
                    phase = 'exhale';
                    count = 6;
                } else {
                    count--;
                }
            } else if (phase === 'exhale') {
                text.textContent = `Breathe Out (${count})`;
                circle.classList.remove('inhale');
                circle.classList.add('exhale');

                if (count === 0) {
                    phase = 'hold2';
                    count = 2;
                } else {
                    count--;
                }
            } else if (phase === 'hold2') {
                text.textContent = `Hold (${count})`;

                if (count === 0) {
                    phase = 'inhale';
                    count = 4;
                } else {
                    count--;
                }
            }
        }

        updateBreathing(); // Start immediately
        breathingInterval = setInterval(updateBreathing, 1000);
    } else {
        stopBreathingExercise();
    }
}

function stopBreathingExercise() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const btn = document.getElementById('breathingBtn');

    isBreathing = false;
    clearInterval(breathingInterval);

    circle.classList.remove('inhale', 'exhale');
    text.textContent = 'Great job! Click Start to try again';
    btn.textContent = 'Start Breathing Exercise';
}

document.getElementById('breathingBtn').addEventListener('click', startBreathingExercise);

// ===================
// JOURNALING PROMPTS
// ===================

const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt truly peaceful.",
    "What is one small step you can take today to care for yourself?",
    "How did you handle a challenging situation recently?",
    "What positive qualities do you see in yourself?",
    "Describe your ideal day for mental wellness.",
    "What activities help you feel most centered and calm?",
    "How do you typically cope with stress, and what works best?",
    "What would you tell a friend who was going through what you're experiencing?",
    "What are your hopes for your mental health journey?",
    "Describe a time when you overcame a difficult challenge.",
    "What does self-compassion mean to you?",
    "How do you know when you need to ask for help?",
    "What environments or settings help you feel most at peace?",
    "What personal strengths have helped you through tough times?"
];

let currentPromptIndex = -1;

function getNewPrompt() {
    const promptText = document.getElementById('promptText');

    // Get a different prompt than the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * journalPrompts.length);
    } while (newIndex === currentPromptIndex && journalPrompts.length > 1);

    currentPromptIndex = newIndex;
    promptText.textContent = journalPrompts[currentPromptIndex];

    // Save the prompt to localStorage
    localStorage.setItem('currentJournalPrompt', journalPrompts[currentPromptIndex]);
}

function saveJournalEntry() {
    const entry = document.getElementById('journalEntry').value.trim();
    const saveMessage = document.getElementById('saveMessage');

    if (entry) {
        const journalData = {
            date: new Date().toISOString(),
            prompt: document.getElementById('promptText').textContent,
            entry: entry
        };

        let savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        savedEntries.push(journalData);
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

        saveMessage.style.display = 'block';
        setTimeout(() => {
            saveMessage.style.display = 'none';
        }, 3000);

        // Clear the text area
        document.getElementById('journalEntry').value = '';
    } else {
        alert('Please write something before saving your entry.');
    }
}

// Load saved prompt on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedPrompt = localStorage.getItem('currentJournalPrompt');
    if (savedPrompt) {
        document.getElementById('promptText').textContent = savedPrompt;
    }
});

document.getElementById('newPromptBtn').addEventListener('click', getNewPrompt);
document.getElementById('saveEntryBtn').addEventListener('click', saveJournalEntry);

// ===================
// CONTACT FORM
// ===================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const form = this;
    
    // Show loading state
    formMessage.innerHTML = `
        <div class="loading-message">
            <div class="spinner"></div>
            <span>Sending your message...</span>
        </div>
    `;
    formMessage.className = 'loading';
    formMessage.style.display = 'block';

    // Simulate form submission
    setTimeout(() => {
        try {
            // Get form data
            const formData = new FormData(form);
            
            // Store in localStorage (for demo)
            const submission = {
                date: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') === 'on'
            };
            
            let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));

            // Show success message with saved data preview
            const preview = `
                <p><strong>Name:</strong> ${submission.name}</p>
                <p><strong>Email:</strong> ${submission.email}</p>
                <p><strong>Subject:</strong> ${submission.subject}</p>
                <p><strong>Message:</strong> ${submission.message.substring(0, 50)}...</p>
            `;
            
            formMessage.innerHTML = `
                <strong>✅ Message saved successfully!</strong>
                ${preview}
                <p class="demo-note">Note: In a production environment, this would be sent to a server.</p>
            `;
            formMessage.className = 'success';
            
            // Reset form
            form.reset();
        } catch (error) {
            formMessage.innerHTML = `
                <strong>⚠️ Error saving message</strong>
                <p>${error.message}</p>
                <p>Please try again later.</p>
            `;
            formMessage.className = 'error';
            console.error('Form submission error:', error);
        }
    }, 1500);
});

// Add ARIA labels and improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels to interactive elements
    const breathingBtn = document.getElementById('breathingBtn');
    if (breathingBtn) {
        breathingBtn.setAttribute('aria-label', 'Start guided breathing exercise');
    }

    const quizButtons = document.querySelectorAll('#nextBtn, #prevBtn, #submitBtn');
    quizButtons.forEach(btn => {
        btn.setAttribute('role', 'button');
    });

    // Add live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'liveRegion';
    document.body.appendChild(liveRegion);
});

// ===================
// PERFORMANCE MONITORING
// ===================

// Simple performance tracking
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);

    // Store performance data
    const perfData = {
        loadTime: Math.round(loadTime),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 100) // Truncated for storage
    };

    let perfHistory = JSON.parse(localStorage.getItem('performanceHistory') || '[]');
    perfHistory.push(perfData);

    // Keep only last 10 entries
    if (perfHistory.length > 10) {
        perfHistory = perfHistory.slice(-10);
    }

    localStorage.setItem('performanceHistory', JSON.stringify(perfHistory));
});

// ===================
// UTILITY FUNCTIONS
// ===================

// Template literal helper for dynamic content
function createTemplate(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] || '';
        return `${result}${string}${value}`;
    });
}

// Array methods for managing data
function filterDataByDate(dataArray, days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return dataArray.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoffDate;
    });
}

// Object management for user preferences
const userPreferences = {
    theme: localStorage.getItem('theme') || 'light',
    fontSize: localStorage.getItem('fontSize') || 'medium',
    animations: localStorage.getItem('animations') !== 'false',

    save() {
        Object.keys(this).forEach(key => {
            if (key !== 'save' && key !== 'load') {
                localStorage.setItem(key, this[key]);
            }
        });
    },

    load() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.fontSize = localStorage.getItem('fontSize') || 'medium';
        this.animations = localStorage.getItem('animations') !== 'false';
    }
};

// Initialize user preferences
userPreferences.load();

console.log('MindWell Hub loaded successfully!');
