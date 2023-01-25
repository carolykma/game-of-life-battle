// global
let columns = 0;
let rows = 0;
let currentBoard = [];
let nextBoard = [];

class BaseGame {
    constructor() {
        this.init();
        this.disableAction = false;
    }

    init() {
        // reset board only if size does not match
        this.getDimensions();
        if (columns !== currentBoard.length || rows !== currentBoard[0].length) {
            this.resetBoard();
            this.randomize();
        }
    }

    getDimensions() {
        columns = Math.floor(window.width / unitLength);
        rows = Math.floor(window.height / unitLength);
    }

    resetBoard() {
        currentBoard = [];
        nextBoard = [];
        for (let i = 0; i < columns; i++) {
            currentBoard[i] = [];
            nextBoard[i] = [];
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = 0;
                nextBoard[i][j] = 0;
            }
        }
        this.paint();
    }

    disable() {
        this.disableAction = true;
    }

    enable() {
        this.disableAction = false;
    }

    // randomize board state
    randomize() {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = random() > 0.85 ? 1 : 0;
                nextBoard[i][j] = 0;
            }
        }
        this.paint();
    }

    // calc next board status
    generate() {
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                // Count living neighbors
                let neighbors = 0;
                for (let i of [-1, 0, 1]) {
                    for (let j of [-1, 0, 1]) {
                        if (i == 0 && j == 0) continue;
                        if (stopAtBoundary) {
                            if ((x + i) < 0 || (x + i) >= columns) continue;
                            if ((y + j) < 0 || (y + j) >= rows) continue;
                        }
                        if (currentBoard[(x + i + columns) % columns][(y + j + rows) % rows] > 0) {
                            neighbors += 1;
                        }
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
                    nextBoard[x][y] = 1;
                } else {
                    // Stasis
                    if (currentBoard[x][y] == 0) nextBoard[x][y] = 0;
                    else nextBoard[x][y] = currentBoard[x][y] + 1;
                }
            }
        }

        // Swap the nextBoard to be the current Board
        [currentBoard, nextBoard] = [nextBoard, currentBoard];
    }

    getGrid(x, y) {
        return currentBoard[x][y];
    }
    fillGrid(x, y) {
        currentBoard[x][y] = 1;
        this.paintGrid(x, y);
    }
    eraseGrid(x, y) {
        currentBoard[x][y] = 0;
        this.paintGrid(x, y);
    }
    previewGrid(x, y) {
        drawGrid(x, y, [...boxColor, 30]);
    }



    // DISPLAY
    paint() {
        background(...backgroundColor);
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.paintGrid(i, j);
            }
        }
    }
    paintGrid(i, j) {
        // clear grid first since boxColor is semi-transparent 
        drawGrid(i, j, backgroundColor);
        if (currentBoard[i][j] > 0) {
            drawGrid(i, j, this.getGridColor(i, j));
        }

        // print age mode
        if (printAge) {
            noStroke();
            fill("#008888");
            text(currentBoard[i][j], i * unitLength, (j + 0.9) * unitLength);
        }
    }
    getGridColor(i, j) {
        return [...boxColor, 50 + currentBoard[i][j] * 10];
    }



    // INTERACTION
    onHover(x, y) {
        // preview pattern when pattern is held
        if (currentPattern) {
            const arr = allPatterns[currentPattern];
            const x0 = x - floor(arr.length / 2);
            const y0 = y - floor(arr[0].length / 2);
            if (!mouseIsPressed) game.onPatternHover(x0, y0, arr);
        }
    }
    onPatternHover(x, y, arr) {
        applyOnPattern(arr, x, y, this.previewGrid.bind(this));
    }
    onPatternPlaced(x, y, arr) {
        const isPatternPlaced = applyOnPattern(arr, x, y);
        if (!isPatternPlaced) {
            this.disable();
            Swal.fire({
                title: `Out of Range`,
                text: "You are holding a pattern that might be too large or out of the board's range! You may adjust the position (pay attention to the preview!), select a smaller pattern, or press the same pattern again to release it.",
                icon: 'info',
                confirmButtonText: 'Got it'
            }).then(() => this.enable());
        }
    }
    onGridAction(x, y, isCancelAction) {
        if (isCancelAction) {
            this.eraseGrid(x, y);
        } else {
            this.fillGrid(x, y);
        }
    }
}