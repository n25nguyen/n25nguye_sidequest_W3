// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawLose() → what the lose screen looks like
// 2) input handlers → how the player returns to the start screen

// ------------------------------
// Main draw function for lose screen
// ------------------------------
// drawLose() is called from main.js
// only when currentScreen === "lose"
function drawLose() {
  // Red-tinted background to communicate failure
  background(255, 210, 210);

  fill(0);
  textAlign(CENTER, CENTER);

  // Main message
  textSize(40);
  text("Some moments pass quietly.", width / 2, 280);

  //SUbtext message
  textSize(20);
  text(
    "You chose to stay silent. While it may have been easier, the incident left a mark.\nSometimes, not acting has consequences too.",
    width / 2,
    330,
  );

  // Restart text
  textSize(20);
  text("Click or press R to reflect and restart.", width / 2, 390);
}

// ------------------------------
// Mouse input for lose screen
// ------------------------------
// Any mouse click returns the player to the start screen
// (no buttons needed for this simple end state)
function loseMousePressed() {
  karma = 0;
  scene = 0;
  currentScreen = "start";
}

// ------------------------------
// Keyboard input for lose screen
// ------------------------------
// R is commonly used for “restart” in games
function loseKeyPressed() {
  if (key === "r" || key === "R") {
    karma = 0;
    scene = 0;
    currentScreen = "start";
  }
}
