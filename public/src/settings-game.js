// game state
let game = null;
let running = false;

// board dimensions
let unitLength = 25;
let fullPage = false;

// game rule variables
let neighborsMin = 2;
let neighborsMax = 3;
let reproduceMin = 3;
let reproduceMax = 3;
let stopAtBoundary = false;

// reset game rules oninput
function resetRules() {
    neighborsMin = parseInt(document.querySelector("#neightbors-min").value);
    neighborsMax = parseInt(document.querySelector("#neightbors-max").value);
    reproduceMin = parseInt(document.querySelector("#reproduce-min").value);
    reproduceMax = parseInt(document.querySelector("#reproduce-max").value);
}

// start button
const startBtn = document.querySelector("#start-btn");
function toggleStart(bool) {
    running = bool == undefined ? !running : bool;
    if (startBtn) {
        if (running) {
            startBtn.classList.add("running");
            startBtn.innerHTML = "Pause";
        } else {
            startBtn.classList.remove("running");
            startBtn.innerHTML = "Start";
        }
    }
}
// randomize button
function randomize() {
    game.randomize();
}
// clear button
function clearBoard() {
    game.resetBoard();
}

function toggleStopAtBoundary() {
    stopAtBoundary = !stopAtBoundary;
    document.getElementById("toggle-boundary").classList.toggle("selected");
}

const sliderGridSize = document.querySelector("#slider-grid-size");
if (sliderGridSize) {
    sliderGridSize.oninput = function () {
        unitLength = parseInt(this.value);
        document.querySelector("#grid-size").textContent = this.value;
        game.init();
    }
}

// 3 tabs
const tabs = {
    rules: {
        div: document.querySelector("#rules-div"),
        btn: document.querySelector("#toggle-rules"),
    },
    patterns: {
        div: document.querySelector("#patterns-div"),
        btn: document.querySelector("#toggle-patterns"),
    },
    drawingPad: {
        div: document.querySelector("#drawing-div"),
        btn: document.querySelector("#toggle-drawing"),
    }
}

function toggleTabs(tab) {
    Object.entries(tabs).forEach(([key, obj]) => {
        if (key === tab) {
            obj.div.classList.remove("hide");
            obj.btn.classList.add("selected");
        } else {
            obj.div.classList.add("hide");
            obj.btn.classList.remove("selected");
        }
    })
}

// toggle game modes
function toggleBattleMode() {
    if (game instanceof ColorModeGame) toggleColorMode();
    if (game instanceof BattleModeGame) {
        game = new BaseGame()
    } else {
        game = new BattleModeGame();
        toggleTabs("patterns");
    }
    
    document.querySelector("#score-board").classList.toggle("hide");
    document.querySelector("#toggle-battle").classList.toggle("selected");

    // turn off & disable color mode, age mode, randomize
    document.querySelector("#toggle-color").classList.toggle("disabled");
    document.querySelector("#toggle-age").classList.toggle("disabled");
    document.querySelector("#randomize").classList.toggle("disabled");
}
function toggleColorMode() {
    if (game instanceof ColorModeGame) {
        game = new BaseGame();
        document.querySelector("#toggle-color").classList.remove("selected");
    } else {
        game = new ColorModeGame();
        document.querySelector("#toggle-color").classList.add("selected");
    }
}