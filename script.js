// Quiz questions and answers
const questions = [
  {
    question: "A right triangle has sides 5 and 12. What is the hypotenuse?",
    options: ["13", "7", "17", "10"],
    answer: "13",
    explanation: "Because 5² + 12² = 25 + 144 = 169, and √169 = 13."
  },
  {
    question: "Which side is always the longest in a right triangle?",
    options: ["The short side", "The hypotenuse", "The base", "Any side"],
    answer: "The hypotenuse",
    explanation: "The hypotenuse is the side opposite the right angle and is always the longest side."
  },
  {
    question: "What is 8² + 6²?",
    options: ["42", "100", "14", "96"],
    answer: "100",
    explanation: "8² = 64 and 6² = 36, so 64 + 36 = 100."
  },
  {
    question: "If a = 9 and b = 12, then c = ?",
    options: ["15", "18", "21", "12"],
    answer: "15",
    explanation: "9² + 12² = 81 + 144 = 225, and √225 = 15."
  },
  {
    question: "Which formula is used for right triangles?",
    options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c²"],
    answer: "a² + b² = c²",
    explanation: "This is Pythagoras' theorem for right-angled triangles."
  }
];

// Build the quiz on the page
const quizContainer = document.getElementById("quiz");
const resetBtn = document.getElementById("reset-btn");

function buildQuiz() {
  quizContainer.innerHTML = "";

  questions.forEach((item, index) => {
    const questionCard = document.createElement("div");
    questionCard.className = "quiz-item";

    const questionText = document.createElement("p");
    questionText.className = "quiz-question";
    questionText.textContent = `${index + 1}. ${item.question}`;
    questionCard.appendChild(questionText);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "options";

    item.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";
      button.textContent = option;

      button.addEventListener("click", () => {
        // Only allow one answer per question
        const allButtons = button.parentElement.querySelectorAll(".option-btn");
        allButtons.forEach((btn) => {
          btn.disabled = true;
          btn.classList.remove("correct", "incorrect");
        });

        const isCorrect = option === item.answer;

        if (isCorrect) {
          button.classList.add("correct");
        } else {
          button.classList.add("incorrect");
          const correctButton = Array.from(allButtons).find(
            (btn) => btn.textContent === item.answer
          );
          if (correctButton) {
            correctButton.classList.add("correct");
          }
        }

        const feedback = document.createElement("div");
        feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
        feedback.textContent = isCorrect
          ? "Correct! " + item.explanation
          : "Not quite. " + item.explanation;

        // Remove previous feedback if it exists
        const previousFeedback = questionCard.querySelector(".feedback");
        if (previousFeedback) previousFeedback.remove();

        questionCard.appendChild(feedback);
      });

      optionsWrap.appendChild(button);
    });

    questionCard.appendChild(optionsWrap);
    quizContainer.appendChild(questionCard);
  });

  // Show score summary after all 5 questions
  const scoreText = document.createElement("p");
  scoreText.className = "quiz-score";
  scoreText.textContent = "You are ready to practise your Pythagoras skills!";
  quizContainer.appendChild(scoreText);
}

// Reset quiz
resetBtn.addEventListener("click", buildQuiz);

// Start quiz on page load
buildQuiz();
