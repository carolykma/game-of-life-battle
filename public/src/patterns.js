// patterns
let currentPattern = "";
let allPatterns = {
    Sq3x3: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    Sq5x5: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
    Blinker: [[1, 1, 1],],
    Beacon: [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]],
    Toad: [[0, 1], [1, 1], [1, 1], [1, 0]],
    Glider: [[0, 1, 0], [1, 0, 0], [1, 1, 1]],
    Spaceship1: [[0, 1, 0, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 0]],
    Spaceship2: [[0, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 0], [0, 1, 0, 0]],
    Pulsar: [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1], [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],],
    PentaDecathlon: [[0, 1, 0], [0, 1, 0], [0, 0, 0], [0, 1, 0], [1, 0, 1], [0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0], [1, 1, 1], [0, 0, 0], [1, 0, 1], [0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 1, 0],],
    GosperGliderGun: [[0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0]],
}



/* PATTERN 
BUTTONS */
const btnPatternContainer = document.querySelector("#btn-pattern-container");
const inputCustomPatternName = document.querySelector("#custom-pattern-name");

function getBtnPatternHtml(patternName) {
    return `<button id="${patternName}" class="btn-tertiary"
        onclick="holdPattern(this.id)">${patternName}</button>`;
}

// generate initial pattern buttons
if (btnPatternContainer) {
    btnPatternContainer.innerHTML = Object.keys(allPatterns).reduce((acc, patternName) => {
        return acc + getBtnPatternHtml(patternName);
    }, "");
}

// generate custom pattern buttons
function saveArr() {
    let arr = printArr();
    let name = inputCustomPatternName.value;
    if (allPatterns[name]) {
        game.disable();
        Swal.fire({
            title: 'Save Failed!',
            text: 'Pattern name is already taken, please enter a different name.',
            icon: 'error',
            confirmButtonText: 'Ok'
        }).then(() => game.enable());
    } else {
        allPatterns[name] = arr;
        btnPatternContainer.insertAdjacentHTML('beforeend', getBtnPatternHtml(name));
        holdPattern(name);
        toggleTabs("patterns");
        if (name.substring(0, name.length - 1) == "CustomPattern") {
            inputCustomPatternName.value = "CustomPattern" + (parseInt(name.substring(name.length - 1)) + 1);
        }
    }
}



/* PATTERN
ACTIONS */
function holdPattern(id = Object.keys(allPatterns)[0]) {
    if (currentPattern == id) {
        releasePattern();
    } else {
        if (currentPattern != "") document.getElementById(currentPattern).classList.remove("selected");
        document.getElementById(id).classList.add("selected");
        currentPattern = id;
    }
}
function releasePattern() {
    document.getElementById(currentPattern).classList.remove("selected");
    currentPattern = "";
}

// apply action on a pattern (default: fill)
function applyOnPattern(pattern, x0, y0, callback) {
    let patternWidth = pattern.length;
    let patternHeight = pattern[0].length;
    if ((x0 + patternWidth) > columns || (y0 + patternHeight) > rows || x0 < 0 || y0 < 0) {
        return false; // indicates action is aborted
    }

    for (let i = 0; i < patternWidth; i++) {
        for (let j = 0; j < patternHeight; j++) {
            if (pattern[i][j] > 0) {
                if (callback) callback(x0 + i, y0 + j);
                else game.fillGrid(x0 + i, y0 + j);
            }
        }
    }
    return true; // indicates action is complete
}

// rotate
document.addEventListener('keydown', rotateClockwise);
function rotateClockwise(e) {
    if ((e.code == "ArrowUp" || e.code == "Space") && currentPattern != "") {
        e.preventDefault();
        let arrTemp = [];
        for (let j in allPatterns[currentPattern][0]) {
            arrTemp.unshift([]);
            for (let i in allPatterns[currentPattern]) {
                arrTemp[0].push(allPatterns[currentPattern][i][j]);
            }
        }
        [arrTemp, allPatterns[currentPattern]] = [allPatterns[currentPattern], arrTemp];
    }
}
document.addEventListener('keydown', rotateAntiClockwise);
function rotateAntiClockwise(e) {
    if (e.code == "ArrowDown" && currentPattern != "") {
        e.preventDefault();
        let arrTemp = [];
        for (let j in allPatterns[currentPattern][0]) {
            arrTemp.push([]);
            for (let i in allPatterns[currentPattern]) {
                arrTemp[j].unshift(allPatterns[currentPattern][i][j]);
            }
        }
        [arrTemp, allPatterns[currentPattern]] = [allPatterns[currentPattern], arrTemp];
    }
}



/* DRAWING
PAD */
function printArr() {
    // check starting & ending rows/cols of pattern
    let rangeOfPattern = { x0: 0, xn: 0, y0: 0, yn: 0 };
    for (let i in currentBoard) {
        if (currentBoard[i].some(x => x > 0)) {
            rangeOfPattern.x0 = i;
            break;
        }
    }
    for (let i = columns - 1; i >= 0; i--) {
        if (currentBoard[i].some(x => x > 0)) {
            rangeOfPattern.xn = i;
            break;
        }
    }
    let indexIsFound = false;
    for (let j in currentBoard) {
        for (let i = 0; i < columns; i++) {
            if (currentBoard[i][j] > 0) {
                rangeOfPattern.y0 = j;
                indexIsFound = true;
                break;
            }
        }
        if (indexIsFound) break;
    }
    indexIsFound = false;
    for (let j = rows - 1; j >= 0; j--) {
        for (let i = 0; i < columns; i++) {
            if (currentBoard[i][j] > 0) {
                rangeOfPattern.yn = j;
                indexIsFound = true;
                break;
            }
        }
        if (indexIsFound) break;
    }

    // create output array
    let arr = [];
    for (let i = rangeOfPattern.x0; i <= rangeOfPattern.xn; i++) {
        arr.push([]);
        for (let j = rangeOfPattern.y0; j <= rangeOfPattern.yn; j++) {
            if (currentBoard[i][j] == 0) arr[i - rangeOfPattern.x0].push(0);
            else if (currentBoard[i][j] > 0) arr[i - rangeOfPattern.x0].push(1);
        }
    }

    // display output array as str
    let output = "";
    for (let i of arr) {
        output += `[${i.toString()}], `
    }
    output = `[ ${output}]`
    document.querySelector("#arr-display").value = output;

    // return output array
    return arr;
}