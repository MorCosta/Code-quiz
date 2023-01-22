// Select elements
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesDiv = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackDiv = document.getElementById("feedback");
const time = document.getElementById("time");

// Questions and answers
const questions = [
  {
    question: "What is the syntax for creating a function in JavaScript?",
    choices: ["function myFunction()", "function = myFunction()", "var function = myFunction()"],
    answer: "function myFunction()"
  },
  {
    question: "What is the syntax for an if statement in JavaScript?",
    choices: ["if i == 5", "if (i == 5)", "if i = 5"],
    answer: "if (i == 5)"
  },
  {
    question: "What is the syntax for a for loop in JavaScript?",
    choices: ["for (i = 0; i < 5; i++)", "for i = 0 to 5", "for (var i = 0; i < 5; i++)"],
    answer: "for (var i = 0; i < 5; i++)"
  }
];

// Initialize variables
let currentQuestion = 0;
let timer;
let score = 0;

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);


// Start the quiz
function startQuiz() {
    startButton.style.display = "none";
    questionsDiv.classList.remove("hide");
    time.textContent = 30; 
    timer = setInterval(updateTime, 1000);
    displayQuestion();
  }
  
  function updateTime() {
    time.textContent--;
    if (time.textContent === "0") {
      clearInterval(timer);
      endQuiz();
    }
  }
  
  function displayQuestion() {
    const current = questions[currentQuestion];
    questionTitle.textContent = current.question;
  
    while (choicesDiv.firstChild) {
      choicesDiv.removeChild(choicesDiv.firstChild);
    }
  
    current.choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", selectAnswer);
      choicesDiv.appendChild(button);
    });
  }
  
  function selectAnswer(event) {
    const selected = event.target;
    const correct = selected.textContent === questions[currentQuestion].answer;
    if (!correct) {
      time.textContent = time.textContent -10;
    }
    if (time.textContent <= 0){
        clearInterval(timer);
        endQuiz();
    }
    feedbackDiv.textContent = correct ? "Correct!" : "Incorrect!";
    feedbackDiv.classList.remove("hide");
    currentQuestion++;
    if (currentQuestion === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    questionsDiv.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = time.textContent;
  }
  
  submitButton.addEventListener("click", saveScore);

  function saveScore() {
    const initials = initialsInput.value;
    const final = finalScore.textContent;
    highscores.push({initials: initials, final: final});
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
  

  
  