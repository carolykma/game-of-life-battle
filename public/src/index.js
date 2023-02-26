// p5 setup
let setupFinished = false;
function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth - 30, windowHeight - 200);
    canvas.parent(document.querySelector('#canvas'));
    initDisplaySettings();
    game = new BaseGame();
    setupFinished = true;
}

// p5 loop
function draw() {
    if (running) game.generate(); // calc board (if not paused)
    game.paint(); // paint board

    // if mouse is in board area
    const index = getGridIndex()
    if (index) game.onHover(index.x, index.y);
}

// paint only, does not change state
function drawGrid(x, y, color) {
    stroke(...strokeColor);
    if (Array.isArray(color)) fill(...color)
    else fill(color);
    rect(x * unitLength, y * unitLength, unitLength, unitLength)
}

// mouse interactions
function getGridIndex() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows || mouseX < 0 || mouseY < 0) return null;
    let x = Math.floor(mouseX / unitLength);
    let y = Math.floor(mouseY / unitLength);
    return { x, y };
}

let isErasing = false; // whether current action is filling or erasing
let lastGrid = null; // the last grid on which an action is performed
function onGridAction(x, y) {
    game.onGridAction(x, y, isErasing);
    lastGrid = { x, y }; // action is performed, prevent repeated action
}

function mousePressed() {
    if (event.type === "touchstart") return; // to fix p5's bug on mobile (https://github.com/processing/p5.js/issues/1815)
    if (game.disableAction) return;
    let index = getGridIndex();
    if (!index) return; // outside of board

    // print pattern when a pattern is being held
    if (currentPattern) {
        const arr = allPatterns[currentPattern];
        const x0 = index.x - floor(arr.length / 2);
        const y0 = index.y - floor(arr[0].length / 2);
        game.onPatternPlaced(x0, y0, arr);
        return;
    } else {
        isErasing = currentBoard[index.x][index.y] > 0;
        onGridAction(index.x, index.y);
    }
}
function mouseDragged() {
    if (game.disableAction) return;
    const index = getGridIndex();
    if (!index) return; // outside of board

    if (lastGrid && lastGrid.x == index.x && lastGrid.y == index.y) return; // still in same grid
    if (currentPattern) return; // holding pattern
    onGridAction(index.x, index.y);
}
function mouseReleased() {
    lastGrid = null;
}

// responsive
function windowResized() {
    if (fullPage) resizeCanvas(windowWidth - 30, windowHeight - 10);
    else resizeCanvas(windowWidth - 30, windowHeight - 200);
    game.init();
}