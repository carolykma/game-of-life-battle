let battleRound = 0;
let currentPlayer = 1;
let playerColors = ["", [160, 80, 255], [125, 245, 105]];
let player1Score = document.querySelector("#score-player1");
let player2Score = document.querySelector("#score-player2");
let player1Bar = document.querySelector("#bar-player1");

class BattleModeGame extends BaseGame {
    constructor() {
        super();
    }

    init() {
        this.getDimensions();
        this.resetBoard();

        // global settings
        if (!currentPattern) holdPattern();
        if (!stopAtBoundary) toggleStopAtBoundary();
        toggleStart(true);
    }

    resetBoard() {
        super.resetBoard();
        battleRound = 0;
        currentPlayer = 1;
    }

    randomize() { }

    generate() {
        let player1Count = 0;
        let player2Count = 0;

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                // Count living neighbors
                let neighbors = 0;
                let neighbors1 = 0;
                let neighbors2 = 0;
                for (let i of [-1, 0, 1]) {
                    for (let j of [-1, 0, 1]) {
                        if (i == 0 && j == 0) continue;
                        if (stopAtBoundary) {
                            if ((x + i) < 0 || (x + i) >= columns) continue;
                            if ((y + j) < 0 || (y + j) >= rows) continue;
                        }

                        // count number of neighbors
                        if (currentBoard[(x + i + columns) % columns][(y + j + rows) % rows] == 1) {
                            neighbors1 += 1;
                        } else if (currentBoard[(x + i + columns) % columns][(y + j + rows) % rows] == 2) {
                            neighbors2 += 1;
                        }
                        neighbors = neighbors1 + neighbors2;
                    }
                }

                // Rules of Life
                if (currentBoard[x][y] > 0 && neighbors < neighborsMin) {
                    // Die of Loneliness
                    nextBoard[x][y] = 0;
                } else if (currentBoard[x][y] > 0 && neighbors > neighborsMax) {
                    // Die of Overpopulation
                    nextBoard[x][y] = 0;
                } else if (currentBoard[x][y] == 0 && neighbors >= reproduceMin && neighbors <= reproduceMax) {
                    // New life due to Reproduction
                    if (neighbors1 > neighbors2) nextBoard[x][y] = 1;
                    else if (neighbors2 > neighbors1) nextBoard[x][y] = 2;
                    else nextBoard[x][y] = Math.random() > 0.5 ? 1 : 2;
                } else {
                    // Stasis
                    if (currentBoard[x][y] == 0) nextBoard[x][y] = 0;
                    else if (neighbors1 > neighbors2) nextBoard[x][y] = 1;
                    else if (neighbors2 > neighbors1) nextBoard[x][y] = 2;
                    else nextBoard[x][y] = currentBoard[x][y];
                }

                // add to player's score count
                if (nextBoard[x][y] == 1) player1Count += 1;
                else if (nextBoard[x][y] == 2) player2Count += 1;
            }
        }

        // Swap the nextBoard to be the current Board
        [currentBoard, nextBoard] = [nextBoard, currentBoard];
        // Update display score
        player1Score.textContent = player1Count;
        player2Score.textContent = player2Count;
        player1Bar.style.width = player1Count * 100 / (player1Count + player2Count) + "%";

        // Stop game if one color takes up the entire board
        if (battleRound > 1) {
            if (player1Count == 0 && player2Count > 0) {
                this.endGame("Green");
            } else if (player2Count == 0 && player1Count > 0) {
                this.endGame("Purple");
            }
        }
    }
    endGame(winnerName) {
        toggleStart(false);
        this.disable();
        setTimeout(() => {
            Swal.fire({
                title: `${winnerName}'s Victory!`,
                icon: 'info',
                confirmButtonText: 'Start Again'
            }).then(() => this.enable());
            this.init();
        }, 0);
    }

    fillGrid(x, y) {
        currentBoard[x][y] = currentPlayer;
        this.paintGrid(x, y);
    }
    previewGrid(x, y) {
        drawGrid(x, y, [...playerColors[currentPlayer], 30]);
    }
    getGridColor(x, y) {
        return playerColors[currentBoard[x][y]];
    }

    fireOutOfRangeAlert() {
        this.disable();
        Swal.fire({
            title: `Out of Range`,
            text: "You are holding a pattern that might be too large or out of the board's / your territory's range! Check the position, or select a smaller pattern to complete your turn.",
            icon: 'info',
            confirmButtonText: 'Got it'
        }).then(() => this.enable());
    }

    onPatternHover(x, y, arr) {
        // block preview in opponent's territory
        noStroke();
        fill(100, 0, 0, 100);
        if (currentPlayer == 1) {
            if ((x + arr.length) > ceil(columns / 2)) {
                rect(ceil(columns / 2) * unitLength, 0, floor(columns / 2) * unitLength, rows * unitLength);
                return;
            }
        } else if (currentPlayer == 2) {
            if (x < floor(columns / 2)) {
                rect(0, 0, floor(columns / 2) * unitLength, rows * unitLength);
                return;
            }
        }
        super.onPatternHover(x, y, arr);
    }
    onPatternPlaced(x, y, arr) {
        if (currentPlayer == 1 && (x + arr.length) > ceil(columns / 2)) {
            this.fireOutOfRangeAlert();
            return;
        } else if (currentPlayer == 2 && x < floor(columns / 2)) {
            this.fireOutOfRangeAlert();
            return;
        }

        const isPatternPlaced = applyOnPattern(arr, x, y);
        if (isPatternPlaced) {
            currentPlayer = currentPlayer == 1 ? 2 : 1;
            battleRound++;
        } else {
            this.fireOutOfRangeAlert();
        }
    }
    onGridAction() {
        alert("Please select a pattern to place!");
    }
}