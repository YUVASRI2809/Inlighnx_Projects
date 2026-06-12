// ============================
// Quiz Questions
// ============================
const quizData = [
    {
        question: "Which language is primarily used for web page structure?",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        correct: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        correct: 1
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "background-color", "text-align", "color"],
        correct: 3
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Document Oriented Method"
        ],
        correct: 0
    },
    {
        question: "Which method is used to select an element by ID?",
        options: [
            "querySelectorAll()",
            "getElementsByClassName()",
            "getElementById()",
            "getElementsByTagName()"
        ],
        correct: 2
    }
];

// ============================
// DOM Elements
// ============================
const questionCounter = document.getElementById("questionCounter");
const progressBar = document.getElementById("progressBar");

const questionText = document.getElementById("questionText");
const answerContainer = document.getElementById("answerContainer");

const submitButton = document.getElementById("submitButton");
const nextButton = document.getElementById("nextButton");
const viewResultsButton = document.getElementById("viewResultsButton");

const quizSection = document.getElementById("quizSection");

const resultsSection = document.getElementById("resultsSection");
const scoreText = document.getElementById("scoreText");
const summaryContainer = document.getElementById("summaryContainer");

const restartButton = document.getElementById("restartButton");

// ============================
// Quiz Variables
// ============================
let currentQuestion = 0;
let score = 0;

let selectedAnswer = null;
let answerSubmitted = false;

let userAnswers = [];

// ============================
// Load First Question
// ============================
loadQuestion();

// ============================
// Display Question
// ============================
function loadQuestion() {

    selectedAnswer = null;
    answerSubmitted = false;

    submitButton.style.display = "inline-block";
    submitButton.disabled = false;

    nextButton.style.display = "none";
    viewResultsButton.style.display = "none";

    answerContainer.innerHTML = "";

    const question = quizData[currentQuestion];

    // Question Number
    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    // Progress Bar
    progressBar.style.width =
        `${((currentQuestion) / quizData.length) * 100}%`;

    // Question Text
    questionText.textContent = question.question;

    // Options
    question.options.forEach((option, index) => {

        const optionDiv = document.createElement("div");

        optionDiv.classList.add("answer-option");

        optionDiv.textContent = option;

        optionDiv.addEventListener("click", () => {

            if (answerSubmitted) return;

            document
                .querySelectorAll(".answer-option")
                .forEach(opt => opt.classList.remove("selected"));

            optionDiv.classList.add("selected");

            selectedAnswer = index;
        });

        answerContainer.appendChild(optionDiv);
    });
}

// ============================
// Submit Answer
// ============================
submitButton.addEventListener("click", () => {

    if (selectedAnswer === null) {
        alert("Please select an answer.");
        return;
    }

    answerSubmitted = true;

    const question = quizData[currentQuestion];

    const options =
        document.querySelectorAll(".answer-option");

    options.forEach((option, index) => {

        if (index === question.correct) {
            option.classList.add("correct");
        }

        if (
            index === selectedAnswer &&
            selectedAnswer !== question.correct
        ) {
            option.classList.add("wrong");
        }
    });

    // Score
    let isCorrect = false;

    if (selectedAnswer === question.correct) {
        score++;
        isCorrect = true;
    }

    // Save user answer
    userAnswers.push({
        question: question.question,
        selected:
            question.options[selectedAnswer],
        correct:
            question.options[question.correct],
        isCorrect: isCorrect
    });

    submitButton.style.display = "none";

    // Last Question
    if (currentQuestion === quizData.length - 1) {
        viewResultsButton.style.display = "inline-block";
    }
    else {
        nextButton.style.display = "inline-block";
    }
});

// ============================
// Next Question
// ============================
nextButton.addEventListener("click", () => {

    currentQuestion++;

    loadQuestion();
});

// ============================
// View Results
// ============================
viewResultsButton.addEventListener("click", () => {

    showResults();
});

// ============================
// Show Results
// ============================
function showResults() {

    quizSection.style.display = "none";

    resultsSection.style.display = "block";

    progressBar.style.width = "100%";

    scoreText.textContent =
        `Your Score: ${score} / ${quizData.length}`;

    summaryContainer.innerHTML = "";

    userAnswers.forEach((answer, index) => {

        const summaryItem =
            document.createElement("div");

        summaryItem.classList.add("summary-item");

        summaryItem.classList.add(
            answer.isCorrect ? "correct" : "wrong"
        );

        summaryItem.innerHTML = `
            <p>
                <strong>Question ${index + 1}:</strong>
                ${answer.question}
            </p>

            <p>
                <strong>Your Answer:</strong>
                ${answer.selected}
            </p>

            <p>
                <strong>Correct Answer:</strong>
                ${answer.correct}
            </p>

            <p>
                ${answer.isCorrect
                    ? "✅ Correct"
                    : "❌ Incorrect"}
            </p>
        `;

        summaryContainer.appendChild(summaryItem);
    });
}

// ============================
// Restart Quiz
// ============================
restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    selectedAnswer = null;
    answerSubmitted = false;

    userAnswers = [];

    quizSection.style.display = "block";

    resultsSection.style.display = "none";

    progressBar.style.width = "0%";

    loadQuestion();
});