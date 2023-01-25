let colorPalettes = {
    green: ["#f4f269", "#cee26b", "#a8d26d", "#82c26e", "#5cb270"],
    relaxed: ["#037171", "#00a6a6", "#efca08", "#f49f0a", "#f08700"],
    blue: ["#00a6fb", "#0582ca", "#006494", "#003554", "#051923"],
    warm: ["#220901", "#621708", "#941b0c", "#bc3908", "#f6aa1c"],
}
let colorPaletteKeys = Object.keys(colorPalettes);
let currentPaletteKey = "blue";
let currentPalette = colorPalettes[currentPaletteKey];
let lastBoardColors = [];

class ColorModeGame extends BaseGame {
    constructor() {
        super();
    }
    
    init() {
        super.init();
        // pick random palette
        currentPaletteKey = colorPaletteKeys[floor(random(colorPaletteKeys.length))];
        currentPalette = colorPalettes[currentPaletteKey];

        // init lastBoardColors array
        lastBoardColors = [];
        this.paint();
    }

    getGridColor(x, y) {
        if (lastBoardColors[x] && lastBoardColors[x][y]) return lastBoardColors[x][y];
        const color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
        if (!lastBoardColors[x]) lastBoardColors[x] = [];
        lastBoardColors[x][y] = color;
        return color;
    }
}