const highscoresDiv = document.getElementById("highscores");
const clearButton = document.getElementById("clear");
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function displayHighscores() {
  highscoresDiv.innerHTML = "";
  highscores.forEach(score => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="initials">${score.initials}</span> <span class="score">${score.final}</span>`;
    highscoresDiv.appendChild(li);
  });
}

displayHighscores();
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
  localStorage.removeItem("highscores");
  highscores = [];
  displayHighscores();
}