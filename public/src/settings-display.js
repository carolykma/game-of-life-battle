// display
let darkMode = true;
let printAge = false;
let sliderFr = document.querySelector("#slider-fr");

// colors
let primaryColor = [34, 34, 34];
let secondaryColor = [221, 221, 221];
let backgroundColor;
let boxColor;
let strokeColor;

function initDisplaySettings() {
    frameRate(sliderFr ? parseInt(sliderFr.value) : 15);
    setGlobalColors();
}

// set global colors on change of settings
function setGlobalColors() {
    backgroundColor = primaryColor;
    boxColor = secondaryColor;
    let k = darkMode ? -1 : 1;
    strokeColor = secondaryColor.map(x => x + k * 170);
}

// frame rate slider
if (sliderFr) {
    sliderFr.oninput = function () {
        frameRate(parseInt(this.value));
        document.querySelector("#fr").textContent = this.value;
    }
}

function toggleDark() {
    darkMode = !darkMode;
    document.querySelector("#toggle-dark").classList.toggle("selected");
    [primaryColor, secondaryColor] = [secondaryColor, primaryColor];
    setGlobalColors();
    game.paint();
    document.body.style.setProperty("--primary-color", `rgb(${primaryColor.join(", ")})`);
    document.body.style.setProperty("--secondary-color", `rgb(${secondaryColor.join(", ")})`);
}

function toggleShowAge() {
    printAge = !printAge;
    document.querySelector("#toggle-age").classList.toggle("selected");
    game.paint();
}