let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scores = {
  X: 0,
  O: 0,
  tie: 0,
};

// DOM elements
const boardElement = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreTie = document.getElementById("score-tie");

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

resetButton.addEventListener("click", resetGame);

// Functions
function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  // Check if cell is already filled or game is not active
  if (gameBoard[index] !== "" || !gameActive) {
    return;
  }

  // Update game state
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  // Check result
  if (checkWin()) {
    gameActive = false;
    scores[currentPlayer]++;
    updateScores();
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    highlightWinningCells();
  } else if (checkDraw()) {
    gameActive = false;
    scores["tie"]++;
    updateScores();
    statusElement.textContent = "Game ended in a draw!";
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";

  statusElement.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winning-cell");
  });
}

function updateScores() {
  scoreX.textContent = scores["X"];
  scoreO.textContent = scores["O"];
  scoreTie.textContent = scores["tie"];
}

function highlightWinningCells() {
  winningCombinations.forEach((combination) => {
    if (
      gameBoard[combination[0]] === currentPlayer &&
      gameBoard[combination[1]] === currentPlayer &&
      gameBoard[combination[2]] === currentPlayer
    ) {
      combination.forEach((index) => {
        cells[index].classList.add("winning-cell");
      });
    }
  });
}
