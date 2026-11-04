
// Dynamic game data state check logic
document.addEventListener("DOMContentLoaded", function() {
  loadGameHistoryData();
});

function loadGameHistoryData() {
  // Local storage se standard game state access aur values generate
  const highScore = localStorage.getItem("skyjump_highscore") || "0";
  const totalMatches = localStorage.getItem("skyjump_matches") || "0";
  const coinsCollected = localStorage.getItem("skyjump_coins") || "450";
  
  // Array metrics data sets for last plays back history values
  const playHistory = JSON.parse(localStorage.getItem("skyjump_history") || "[]");

  document.getElementById("board-high-score").innerText = highScore;
  document.getElementById("board-matches").innerText = totalMatches;
  document.getElementById("board-coins").innerText = coinsCollected;

  // Real-time render scorecard box elements
  document.getElementById("hist-1").innerText = playHistory[0] || "-";
  document.getElementById("hist-2").innerText = playHistory[1] || "-";
  document.getElementById("hist-3").innerText = highScore;
}

// Data updating utility logic trigger in-game play finished event state
function saveNewGameDataScore(score, coinsEarned) {
  let matches = parseInt(localStorage.getItem("skyjump_matches") || "0") + 1;
  let coins = parseInt(localStorage.getItem("skyjump_coins") || "450") + coinsEarned;
  let history = JSON.parse(localStorage.getItem("skyjump_history") || "[]");
  let currentHighScore = parseInt(localStorage.getItem("skyjump_highscore") || "0");

  if (score > currentHighScore) {
    localStorage.setItem("skyjump_highscore", score);
  }

  history.unshift(score);
  if (history.length > 5) history.pop();

  localStorage.setItem("skyjump_matches", matches);
  localStorage.setItem("skyjump_coins", coins);
  localStorage.setItem("skyjump_history", JSON.stringify(history));

  loadGameHistoryData(); // refreshing real-time UI values
}
