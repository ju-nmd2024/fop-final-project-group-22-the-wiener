class CharakterDog {
    constructor (characterDog)
    this.size = 0.3;
    this.x = 525;
    this.y = 1420;
    this. charakterDog = charakterDog;
}

show() {
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
movement(){
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
}