// Dynamic game data state check logic
document.addEventListener("DOMContentLoaded", function() {
    loadGameHistoryData();
});

function loadGameHistoryData() {
    const highScore = localStorage.getItem("skyjump_highscore") || "0";
    const totalMatches = localStorage.getItem("skyjump_matches") || "0";
    const coinsCollected = localStorage.getItem("skyjump_coins") || "450";

    let playHistory = [];
    try {
        playHistory = JSON.parse(localStorage.getItem("skyjump_history")) || [];
    } catch(e) {
        playHistory = [];
    }

    const elHighScore = document.getElementById("board-high-score");
    const elMatches = document.getElementById("board-matches");
    const elCoins = document.getElementById("board-coins");
    const elHist1 = document.getElementById("hist-1");
    const elHist2 = document.getElementById("hist-2");
    const elHist3 = document.getElementById("hist-3");

    if (elHighScore) elHighScore.innerText = highScore;
    if (elMatches) elMatches.innerText = totalMatches;
    if (elCoins) elCoins.innerText = coinsCollected;

    if (elHist1) elHist1.innerText = playHistory[0] !== undefined ? playHistory[0] : "-";
    if (elHist2) elHist2.innerText = playHistory[1] !== undefined ? playHistory[1] : "-";
    if (elHist3) elHist3.innerText = highScore;
}

function saveNewGameDataScore(score, coinsEarned = 0) {
    let matches = (parseInt(localStorage.getItem("skyjump_matches"), 10) || 0) + 1;
    let coins = (parseInt(localStorage.getItem("skyjump_coins"), 10) || 450) + coinsEarned;
    let currentHighScore = parseInt(localStorage.getItem("skyjump_highscore"), 10) || 0;

    let history = [];
    try {
        history = JSON.parse(localStorage.getItem("skyjump_history")) || [];
    } catch(e) {
        history = [];
    }

    if (score > currentHighScore) {
        localStorage.setItem("skyjump_highscore", score.toString());
    }

    history.unshift(score);
    if (history.length > 5) history.pop();

    localStorage.setItem("skyjump_matches", matches.toString());
    localStorage.setItem("skyjump_coins", coins.toString());
    localStorage.setItem("skyjump_history", JSON.stringify(history));

    loadGameHistoryData();
}

function startGameIntro() {
  const intro = document.getElementById("intro-screen");
  if (intro) {
    intro.style.display = "none";
  }
}
