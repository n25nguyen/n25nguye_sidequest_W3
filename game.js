// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.

// ------------------------------
// Story state
// ------------------------------
let scene = 0; // which moment in the story we are in
// uses global karma declared in main.js

const gameBtn = {
  x: 400, // x position (centre of the button)
  y: 550, // y position (centre of the button)
  w: 260, // width
  h: 90, // height
  label: "PRESS HERE", // text shown on the button
};

// ------------------------------
// Main draw function for this screen
// ------------------------------
// drawGame() is called from main.js *only*
// when currentScreen === "game"
function drawGame() {
  // Set background colour for the game screen
  background(240, 230, 140);

  // ---- Title and instructions text ----
  fill(0); // black text
  textAlign(CENTER, CENTER);

  if (scene === 0) {
    textSize(32);
    text("A quiet moment", width / 2, 140);

    textSize(18);
    text(
      "You’re walking through the school hallway when you notice a \nclassmate being teased and pushed around by a group of students. \nDo you step in to help, or do you ignore the situation?",
      width / 2,
      210,
    );

    // first choice
    gameBtn.label = "STEP IN";
    gameBtn.x = 400;
    gameBtn.y = 500;
    drawGameButton(gameBtn);

    // second choice
    gameBtn.label = "IGNORE THEM";
    gameBtn.x = 400;
    gameBtn.y = 600;
    drawGameButton(gameBtn);
  } else if (scene === 1) {
    textSize(32);
    text("Later that day...", width / 2, 140);

    textSize(18);
    text(
      "Later in class, the teacher asks what happened in the hallway. \nYou have a chance to speak up about what you saw, \nbut telling the truth might make some students angry. \nDo you tell the truth, or keep quiet to avoid conflict?",
      width / 2,
      210,
    );

    // firt option
    gameBtn.label = "TELL THE TRUTH";
    gameBtn.x = 400;
    gameBtn.y = 500;
    drawGameButton(gameBtn);

    // second option
    gameBtn.label = "KEEP QUIET";
    gameBtn.x = 400;
    gameBtn.y = 600;
    drawGameButton(gameBtn);
  }

  // ---- Cursor feedback ----
  // If the mouse is over the button, show a hand cursor
  // Otherwise, show the normal arrow cursor
  // Karma display
  textSize(14);
  text("Karma: " + karma, width / 2, height - 40);
  cursor(
    isHover({ x: 400, y: 500, w: 260, h: 90 }) ||
      isHover({ x: 400, y: 600, w: 260, h: 90 })
      ? HAND
      : ARROW,
  );
}

// ------------------------------
// Button drawing helper
// ------------------------------
// This function is responsible *only* for drawing the button.
// It does NOT handle clicks or game logic.
function drawGameButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is hovering over the button
  // isHover() is defined in main.js so it can be shared
  const hover = isHover({ x, y, w, h });

  noStroke();

  // Change button colour when hovered
  // This gives visual feedback to the player
  fill(
    hover
      ? color(180, 220, 255, 220) // lighter blue on hover
      : color(200, 220, 255, 190), // normal state
  );

  // Draw the button rectangle
  rect(x, y, w, h, 14); // last value = rounded corners

  // Draw the button text
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------
// Mouse input for this screen
// ------------------------------
// This function is called from main.js
// only when currentScreen === "game"
function gameMousePressed() {
  // scene 0 choices
  if (scene === 0) {
    if (isHover({ x: 400, y: 500, w: 260, h: 90 })) {
      karma += 1; //STEP IN CHOICE
      scene = 1;
    } else if (isHover({ x: 400, y: 600, w: 260, h: 90 })) {
      karma += 0; // IGNORE THEM CHOICE
      scene = 1;
    }
  }
  // scene 1 choices
  else if (scene === 1) {
    if (isHover({ x: 400, y: 500, w: 260, h: 90 })) {
      karma += 1; // TELL THE TRUTH CHOICE
      currentScreen = karma >= 2 ? "win" : "lose";
    } else if (isHover({ x: 400, y: 600, w: 260, h: 90 })) {
      karma += 0; // KEEP QUIET CHOICE
      currentScreen = karma >= 2 ? "win" : "lose";
    }
  }
}

// ------------------------------
// Keyboard input for this screen
// ------------------------------
// Allows keyboard-only interaction (accessibility + design)
function gameKeyPressed() {
  // ENTER key triggers the same behaviour as clicking the button
  if (keyCode === ENTER) {
    if (scene === 0) {
      karma += 1; //choose first option
      scene = 1;
    } else if (scene === 1) {
      karma += 1;
      currentScreen = karma >= 2 ? "win" : "lose";
    }
  }
}

// ------------------------------
// Game logic: win or lose
// ------------------------------
// This function decides what happens next in the game.
// It does NOT draw anything.
function triggerRandomOutcome() {
  // scene-based branching
  if (scene === 0) {
    karma += 1; // helping someone
    scene = 1; //move to next scene
  } else if (scene === 1) {
    karma += 1;

    if (karma >= 2) {
      currentScreen = "win";
    } else {
      currentScreen = "lose";
    }
  }
}
