// variable for guetto image
let currentImageIndex = 0;
let nextImageIndex = 1;
let images = [];
let velocityImage = 5;
let offset = 0;
let state = "start";
let gameState = true;
// variables for the mechanics
let velocityX = 0;
let velocityY = 0;
let acceleration = 0.1;
// variables for charakters
let x = 525;
let y = 1420;
let imgPoliceX = 84;
let imgPoliceY = 440;
let platformX = 10;
let platformY = 10;

//images
function preload() {
  img = loadImage("ghetto1.png");
  imgTwo = loadImage("ghetto2.png");
  imgThree = loadImage("ghetto3.png");
  imgFour = loadImage("ghetto4.png");
  imgPolice = loadImage("policeman.png");

  //store images in an array
  images = [img, imgTwo, imgThree, imgFour];
}

function platform() {
  fill(0, 100, 0);
  rect(platformX + 400, platformY + 450, 100, 20, 20);
  rect(platformX + 500, platformY + 400, 100, 20, 20);
  rect(platformX + 600, platformY + 350, 100, 20, 20);
  rect(platformX + 800, platformY + 450, 100, 20, 20);
  rect(platformX + 900, platformY + 400, 100, 20, 20);
  rect(platformX + 1000, platformY + 450, 100, 20, 20);
  rect(platformX + 1300, platformY + 350, 100, 20, 20);
  rect(platformX + 1500, platformY + 450, 100, 20, 20);
  rect(platformX + 1600, platformY + 400, 100, 20, 20);
  rect(platformX + 1700, platformY + 350, 100, 20, 20);
  rect(platformX + 1800, platformY + 300, 100, 20, 20);
  rect(platformX + 1900, platformY + 400, 100, 20, 20);
}

function charakterDog() {
  noStroke();

  push();
  translate();
  scale(0.3);

  //tail
  fill(70, 35, 20);
  push();
  translate(x + 130, y + 245);
  rotate(0.8);
  arc(0, 0, 70, 30, 0, PI);
  pop();

  //left leg behind
  push();
  translate(x + 210, y + 305);
  rotate(-1.4);
  fill(70, 35, 20);
  ellipse(0, 0, 100, [50]);
  pop();
  push();
  translate(x + 205, y + 355);
  rotate(1);
  fill(70, 35, 20);
  ellipse(0, 0, 50, [20]);
  pop();
  fill(70, 35, 20);
  ellipse(x + 220, y + 370, 27, 17);

  //right leg behind
  push();
  translate(x + 370, y + 345);
  rotate(-1.4);
  fill(70, 35, 20);
  ellipse(0, 0, 50, [30]);
  pop();
  push();
  translate(x + 375, y + 363);
  rotate(0.3);
  fill(70, 35, 20);
  ellipse(0, 0, 40, [20]);
  pop();

  //body shape
  fill(101, 67, 33);
  rect(x + 150, y + 250, 250, 70, 20);
  ellipse(x + 170, y + 285, 70);

  //left leg forward
  push();
  translate(x + 170, y + 320);
  rotate(-0.5);
  fill(101, 67, 33);
  ellipse(0, 0, 100, [50]);
  pop();
  push();
  translate(x + 135, y + 353);
  rotate(1.5);
  fill(101, 67, 33);
  ellipse(0, 0, 50, [25]);
  pop();
  ellipse(x + 145, y + 370, 30, 20);

  //belly
  push();
  translate(x + 340, y + 300);
  rotate(0.2);
  fill(101, 67, 33);
  ellipse(0, 0, 200, [80]);
  pop();

  //right leg forward
  push();
  translate(x + 410, y + 320);
  rotate(1);
  fill(101, 67, 33);
  ellipse(0, 0, 100, [35]);
  pop();
  push();
  translate(x + 440, y + 360);
  rotate(0.4);
  fill(101, 67, 33);
  ellipse(0, 0, 40, [20]);
  pop();

  //neck
  push();
  translate(x + 415, y + 287);
  rotate(1.6);
  fill(101, 67, 33);
  ellipse(0, 0, 100, [70]);
  pop();
  push();
  translate(x + 415, y + 265);
  rotate(1.9);
  fill(101, 67, 33);
  ellipse(0, 0, 100, [70]);
  pop();

  //head
  ellipse(x + 430, y + 210, 80);

  //nose
  ellipse(x + 455, y + 220, 100, 45);

  //ears
  fill(70, 35, 20);
  rect(x + 410, y + 170, 30, 27, 5);
  ellipse(x + 425, y + 200, 30, 60);

  // eyes
  fill(0, 0, 0);
  ellipse(x + 453, y + 200, 15);
  fill(255, 255, 255);
  ellipse(x + 455, y + 203, 7);
  ellipse(x + 450, y + 197, 3);

  //nose
  fill(0, 0, 0);
  ellipse(x + 500, y + 215, 10);

  pop();
}

function setup() {
  createCanvas(885, 600);
  frameRate(30); // control the frame rate for smoother image changes
}

//start screen
function startScreen() {
  background(0, 0, 0);
  //image(imgStartScreen, 400, 450, 150, 200);
  fill(255, 255, 255);
  textStyle(BOLD);
  textSize(50);
  text("STARTE DAS SPIEL!", 240, 266);
  //sausage
  fill(185, 70, 49);
  noStroke();
  rect(315, 405, 300, 100, 50);
  ellipse(305, 455, 30, 20);
  ellipse(625, 455, 30, 20);
  push();
  translate(310, 440);
  rotate(0.5);
  ellipse(0, 0, 30, 20);
  pop();
  push();
  translate(620, 440);
  rotate(-0.5);
  ellipse(0, 0, 30, 20);
  pop();

  fill(255, 255, 255);
  textSize(20);
  text("click the screen to start ;)", 345, 460);
}

//game screen
function gameScreen() {
  offset -= velocityImage;
  if (offset <= -width) {
    offset = 0;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    nextImageIndex = (currentImageIndex + 1) % images.length;
  }

  //image guetto
  imageMode(CENTER);
  image(images[currentImageIndex], width / 2 + offset, height / 2, 950, 600);
  image(
    images[nextImageIndex],
    width + width / 2 + offset,
    height / 2,
    950,
    600
  );
  // draw first image at the end for no gaps
  //if (currentImageIndex === images.length -1) {
  // image (images[0], width + width/2 + offset, height/ 2, 950, 600);
  //}
  image(imgPolice, imgPoliceX, imgPoliceY, 150, 200);
  charakterDog();
  platform();
}

//results screen
function resultScreen() {
  //background(255, 255, 255);
  fill(55, 155, 55);
  textStyle(BOLD);
  textSize(50);
  text("ERGEBNIS", 300, 266);
}

function mechanics() {
  //character coordinates
  charakterDog(x, y);
  //game state and gravity logic
  if (gameState === true) {
    // apply gravity to vertical velocity
    velocityX = velocityX + acceleration;

    imgPoliceX = imgPoliceX + velocityX * 0.3;
    // Update vertical position
    y = y + velocityY;
    // Move charater forward
    x = x + velocityX;
  }
  //jumping effect
  //if (keyIsDown(UP_ARROW)) {
  //velocityX -= boostVelocity;
  //}
  if (keyIsDown(UP_ARROW)) {
    y = y - 100;
  } else {
    y = 1420;
  }
  //platform moves in the x direction
  platformX = platformX - 2;
  //reset the x value of the platform to 885, which is the width of the canvas so that it starts from the far right
  if (platformX < -2000) {
    platformX = width;
  }
}

function draw() {
  //startScreen();

  //gameScreen();

  //charakterDog();

  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    mechanics();
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

//change beetween screens while clicking
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "start";
  }
}
