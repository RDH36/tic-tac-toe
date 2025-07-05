"use strict";
const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");
const player = document.getElementById("player");
if (!board || !player) {
    throw new Error("Board or player not found");
}
let cells = [];
let currentPlayer = "X";
let gameActive = true;
if (gameActive) {
    resetButton ? (resetButton.style.display = "none") : null;
}
function createBoard() {
    board ? (board.innerHTML = "") : null;
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.tabIndex = i;
        cell.addEventListener("click", handleCellClick);
        board === null || board === void 0 ? void 0 : board.appendChild(cell);
        cells.push(cell);
    }
    player ? (player.textContent = "Nouvelle partie ! À toi de jouer !") : null;
}
function handleCellClick(e) {
    const cell = e.target;
    if (!gameActive || (cell === null || cell === void 0 ? void 0 : cell.textContent) !== "")
        return;
    cell.textContent = currentPlayer;
    const winPattern = checkWin();
    if (winPattern) {
        highlightWinningCells();
        setGameMessage("win");
        gameActive = false;
        if (resetButton)
            resetButton.style.display = "block";
        return;
    }
    else if (isDraw()) {
        if (resetButton)
            resetButton.style.display = "block";
        removeRandomCell();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        setGameMessage("next");
        gameActive = true;
        if (currentPlayer === "O") {
            setTimeout(() => {
                iaPlay();
            }, 400);
        }
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setGameMessage("next");
    if (gameActive && currentPlayer === "O") {
        setTimeout(() => {
            iaPlay();
        }, 400);
    }
}
function iaPlay() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            cells[i].textContent = "O";
            const score = minimax(cells, 0, false);
            cells[i].textContent = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== -1) {
        cells[move].textContent = "O";
        const winPattern = checkWin();
        if (winPattern) {
            highlightWinningCells();
            setGameMessage("win-ia");
            gameActive = false;
            if (resetButton)
                resetButton.style.display = "block";
            return;
        }
        else if (isDraw()) {
            removeRandomCell();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            setGameMessage("next-case");
            gameActive = true;
            if (resetButton)
                resetButton.style.display = "block";
            if (currentPlayer === "O") {
                setTimeout(() => {
                    iaPlay();
                }, 400);
            }
            return;
        }
        currentPlayer = "X";
        setGameMessage("next");
    }
}
function minimax(boardState, depth, isMaximizing) {
    if (checkWinSim(boardState, "O"))
        return 10 - depth;
    if (checkWinSim(boardState, "X"))
        return depth - 10;
    if (boardState.every((cell) => cell.textContent !== ""))
        return 0;
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i].textContent === "") {
                boardState[i].textContent = "O";
                let score = minimax(boardState, depth + 1, false);
                boardState[i].textContent = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i].textContent === "") {
                boardState[i].textContent = "X";
                let score = minimax(boardState, depth + 1, true);
                boardState[i].textContent = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
function checkWinSim(boardState, playerSymbol) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return (boardState[a].textContent === playerSymbol &&
            boardState[b].textContent === playerSymbol &&
            boardState[c].textContent === playerSymbol);
    });
}
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            return pattern;
        }
    }
    return null;
}
function removeRandomCell() {
    const filledCells = cells.filter((cell) => cell.textContent !== "");
    if (filledCells.length === 0)
        return;
    const randomIndex = Math.floor(Math.random() * filledCells.length);
    filledCells[randomIndex].textContent = "";
}
function setGameMessage(context) {
    if (!player)
        return;
    if (context === "win") {
        player.textContent = "Bravo, tu as gagné ! 🎉";
    }
    else if (context === "win-ia") {
        player.textContent = "BOBY l'IA a gagné ! 🤖";
    }
    else if (context === "next") {
        player.textContent = "À ton tour de jouer !";
    }
    else if (context === "reset") {
        player.textContent = "Nouvelle partie ! À toi de jouer !";
    }
    else if (context === "next-case") {
        player.textContent = "Case supprimée, à toi de jouer !";
    }
}
function highlightWinningCells() {
    const pattern = checkWin();
    if (pattern) {
        pattern.forEach((idx) => {
            cells[idx].classList.add("win");
        });
    }
}
function isDraw() {
    return cells.every((cell) => cell.textContent !== "");
}
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    gameActive = true;
    currentPlayer = "X";
    setGameMessage("reset");
    if (resetButton)
        resetButton.style.display = "none";
    createBoard();
});
createBoard();
