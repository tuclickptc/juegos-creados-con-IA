// Lógica del juego de Othelo

let board = [];
let currentPlayer = 1;
let gameActive = false;
let numPlayers = 1;

const boardElement = document.getElementById('game-board');
const playerTurnElement = document.getElementById('player-turn');
const startGameButton = document.getElementById('start-game');
const addPlayerButton = document.getElementById('add-player');

// Inicializar el tablero
function initBoard() {
    board = Array(12).fill().map(() => Array(12).fill(0));
    // Posiciones iniciales
    board[5][5] = 2;
    board[6][6] = 2;
    board[5][6] = 1;
    board[6][5] = 1;
    
    renderBoard();
}

// Renderizar el tablero
function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 12; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            if (board[row][col] === 1) {
                cell.classList.add('black');
            } else if (board[row][col] === 2) {
                cell.classList.add('white');
            }
            
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Manejar clic en una celda
function handleCellClick(e) {
    if (!gameActive) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (isValidMove(row, col)) {
        makeMove(row, col);
        switchPlayer();
        renderBoard();
        checkGameOver();
    }
}

// Verificar si un movimiento es válido
function isValidMove(row, col) {
    if (board[row][col] !== 0) return false;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let foundOpponent = false;

        while (x >= 0 && x < 12 && y >= 0 && y < 12) {
            if (board[x][y] === 0) break;
            if (board[x][y] === currentPlayer) {
                if (foundOpponent) return true;
                break;
            }
            foundOpponent = true;
            x += dx;
            y += dy;
        }
    }

    return false;
}

// Realizar un movimiento
function makeMove(row, col) {
    board[row][col] = currentPlayer;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let tilesToFlip = [];

        while (x >= 0 && x < 12 && y >= 0 && y < 12) {
            if (board[x][y] === 0) break;
            if (board[x][y] === currentPlayer) {
                // Flip las fichas
                for (const [fx, fy] of tilesToFlip) {
                    board[fx][fy] = currentPlayer;
                }
                break;
            }
            tilesToFlip.push([x, y]);
            x += dx;
            y += dy;
        }
    }
}

// Cambiar al siguiente jugador
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurnElement.textContent = `Turno de: Jugador ${currentPlayer}`;
}

// Verificar si el juego ha terminado
function checkGameOver() {
    // Lógica para verificar si no hay movimientos válidos
    // y finalizar el juego
}

// Añadir jugador
addPlayerButton.addEventListener('click', () => {
    if (numPlayers < 4) {
        numPlayers++;
        alert(`Añadido Jugador ${numPlayers}`);
    } else {
        alert('No se pueden añadir más de 4 jugadores');
    }
});

// Iniciar el juego
startGameButton.addEventListener('click', () => {
    gameActive = true;
    initBoard();
    playerTurnElement.textContent = `Turno de: Jugador ${currentPlayer}`;
});