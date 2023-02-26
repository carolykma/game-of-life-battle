# Game of Life - Battle!
This project is live at: https://game-of-life-battle.surge.sh
(Try it out!)

## Features
This is a demo project of the classic **Game of Life**, but with the following variations and features:
* Drawing Pad:
    * Patterns that can be printed on to the board
    * Hover preview of the selected pattern
    * Rotate by pressing space
    * Draw & add custom patterns to the list (auto-detects patterns size)
* **Battle mode for 2 players - check it out!**
* Display Controls:
    * Dark / light mode
    * Color mode
    * Custom frame rate / grid size
    * Show age of grid (opacity / number)
* Game Rule Controls:
    * Custom survival / reproduction conditions
    * Toggle stop at boundary

## Design Patterns
This project uses **object-oriented programming (OOP)** to create game modes that are inheritable and extendable. The **color mode** and **battle mode** games inherit from the base game, where painting, game logic and other methods are carefully decoupled from one another.

For instance, the **color mode** class only needs to override the `getGridColor` from the base class. The core game logic remains consistent, while only the relevant methods need to be overridden in the classes of the game variations.

The **battle mode** class, on the other hand, only overrides the methods that handle board calculations and user actions (also `getGridColor`, to show the player colors).

## Tools & Resources Used
* [p5.js](https://p5js.org/) for canvas
* [Bootstrap](https://getbootstrap.com/) for styling
* [SweetAlert2](https://sweetalert2.github.io/) for popups
* [Font Awesome](https://fontawesome.com/icons) for icons
* [surge](https://surge.sh/) for free publishing