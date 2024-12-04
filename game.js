// variable for guetto image
let platforms =[];
let currentImageIndex= 0;
let nextImageIndex= 1;
let images = [];
let sausages =[];
let badFeatures= [];
let goodFeatures= [];
let velocityImage= 5;
let offset = 0;
let state = "start";
let gameState = true;
let imgPoliceX = 84;
let imgPoliceY = 440;  
let timer = 120;
let score = 0; 

 
 
   
//images
function preload() {
    img = loadImage("ghetto1.png");
    imgDog = loadImage ("characterDog.png");
    imgSausage= loadImage ("collectivesausage.png"); 
    imgTwo = loadImage("ghetto2.png");
    imgThree = loadImage("ghetto3.png");
    imgFour = loadImage("ghetto4.png");
    imgPolice = loadImage("policeman.png");
    imgBerlinerLuft = loadImage("berlinerluft.png");
    imgClubmate = loadImage("clubmate.png");
    imgConstruction = loadImage("construction.png");
    imgDynamite = loadImage("dynamite.png");
    imgPant = loadImage("pant.png");
    imgPills = loadImage("pills.png");
    imgShoppingbags = loadImage("shoppingbags.png");
    imgTrashCan = loadImage("trash can.png");
    imgSkizze = loadImage("skizze.png");
    imgErgebnis = loadImage("ergebnis.png");
    imgInstructions = loadImage("instructions1.png");
    imgResult = loadImage ("result.png");
  
    //store images of background in an array
    images = [img, imgTwo, imgThree, imgFour];
  }

 
  class Platform{
    constructor (x, y){
        this.x = x; 
        this.y = y;
        this.width = 100;
    }
    show (){
        push();
        translate(this.x, this.y);
        fill (100, 100, 100);
        rect (0,0, this.width, 20, 20); 
        pop();
    }
    //move with background
    movement() {
      this.x -= velocityImage; 
      if (this.x < -100) { 
          this.x += width + 100;
      }
    }
} 

// created multiple platforms and its organization 
for (let i = 0; i< 4; i++) {
    platforms [i] = new Platform (450 + 200 * i, 400 - 80 * i);
}

class Sausage {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
  }
  show () {
    image (imgSausage, this.x, this. y, this.width, this.height);
  }
  //move with background
  movement() {
    this.x -= velocityImage; 
    if (this.x < -100) { 
        this.x += width + 100;
    }
  }

}


class BadFeature {
  constructor (x,y, img) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.img = img; 

  }
  show() {
    image(this.img, this.x ,this.y, this.width, this.height);
  }
  movement() {
    this.x -= velocityImage; 
    if (this.x < -100) { 
        this.x += width + 100;
    } 
  }
} 

class GoodFeature {
  constructor (x, y, img) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.img = img; 
  }
  show() {
      if (this.img === imgBerlinerLuft) {
        let newWidth = 30; 
        let newHeight = 140; 
        image(this.img, this.x, this.y, newWidth, newHeight);
      } else {
        image(this.img, this.x, this.y, this.width, this.height);
      }
    }
  movement() {
    this.x -= velocityImage; 
    if (this.x < -100) { 
        this.x += width + 100;
    } 
}
}

class Dog {
    constructor (x, y) {
        this.x = x;
        this.y = y; 
        this.width = 140;
        this.height = 100;
        this.velocityY= 0;
        this.gravity = 1;
        this.jumping = false;
    }
    show (){
        image(imgDog, this.x, this.y, this.width, this.height);
    }
    movement() {
      //jumping
      if (keyIsDown(UP_ARROW) && !this.jumping) {
        this.velocityY =-22;
        this.jumping = true;
      }
  // apply gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;
  // prevent dog from going below the ground
  if (this.y >= 505) {
    this.y = 505;
    this.velocityY = 0;
    this.jumping = false;
  }
      
} 
collision (platform) {
        // Check if the dog is landing on the platform
        if (
          this.x + this.width-40 > platform.x && // Dog is horizontally within the platform
          this.x < platform.x + platform.width &&
          this.y + this.height/4 >= platform.y && // Dog's feet touch the platform
          this.y + this.height/4 <= platform.y + 10 && // Avoid snapping below
          this.velocityY >= 0 // Only snap if falling
      ) {
          this.y = platform.y - this.height/4; // Snap to platform
          this.velocityY = 0; // Stop vertical movement
          this.jumping = false; // Allow jump again
      }
  }
}

let dog = new Dog(300, 505);

function setup() {
  createCanvas(885, 600);
  frameRate(30); // control the frame rate for smoother image changes
  for (let i = 0; i < 4; i++) {
    platforms[i] = new Platform(450 + 200 * i, 400 - 80 * i);
  }
  for (let i = 0; i < 10; i++) {
    sausages[i] = new Sausage(400 + 100 * i, 510);
  }
  badFeatures.push(new BadFeature(400, 510, imgTrashCan));
  badFeatures.push(new BadFeature(700, 510, imgShoppingbags));
  badFeatures.push(new BadFeature(1000, 510, imgPant));
  badFeatures.push(new BadFeature(1300, 510, imgDynamite));
  badFeatures.push(new BadFeature(1600, 510, imgConstruction));


  goodFeatures.push(new GoodFeature(platforms[0].x + random(0, platforms[0].width - 50)+20, platforms[0].y - 35, imgPills)); 
  goodFeatures.push(new GoodFeature(platforms[1].x + random(0, platforms[1].width - 50)+18, platforms[1].y - 50, imgClubmate));
  goodFeatures.push(new GoodFeature(platforms[2].x + random(0, platforms[2].width - 50)+25, platforms[2].y - 80, imgBerlinerLuft));
  goodFeatures.push(new GoodFeature(platforms[3].x + random(0, platforms[3].width - 50)+10, platforms[3].y - 50, imgClubmate)); 
  //create good features on random platfroms
  // let goodFeatureImages = [imgPills, imgBerlinerLuft, imgClubmate];
  // for (let img of goodFeatureImages) {
  //   let randomPlatform = random(platforms);
  //   let x = randomPlatform.x + random(0, randomPlatform.width - 50); // Randomize within platform width
  //   let y = randomPlatform.y - 100; // Place slightly above the platform
  //   goodFeatures.push(new GoodFeature(x, y, img));
  // }
}

 

//start screen
function startScreen() {
  background(255, 255, 255);
  //image Skizze of the Wiener
  image(imgSkizze, 50, -10, 800, 500);
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
  //text on the sausage
  fill(255);
  textSize(20);
  text("click the screen to start ;)", 357, 460);
  //text for the instructions
  fill(0);
  rect(420,530,100,50,20);
  fill(255);
  textSize(20);
  text("rules",445,560);
} 
// instruction screen
function instructionScreen() {
  image(imgInstructions,0,0,width,height);
}

//game screen
function gameScreen() {
  
  offset -= velocityImage;
  if (offset <= -width){
    offset = 0;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    nextImageIndex = (currentImageIndex + 1) % images.length;
  }

imageMode(CENTER);
image(images[currentImageIndex], width/2 + offset, height/2, 950, 600);
image(images[nextImageIndex], width + width/2 + offset, height/ 2, 950,600);
image (imgPolice, imgPoliceX, imgPoliceY, 150, 200);
for (let platform of platforms){
    platform.movement();
    platform.show();
} 

//from the class
dog.show();


for (let i = sausages.length - 1; i >= 0; i--) {
  sausages[i].movement();
  sausages[i].show();

   // sausages when being eaten by the dog
   if (abs(dog.x - sausages[i].x) < 50 && abs(dog.y - sausages[i].y) < 30) {
     sausages[i].x=-1000;
     score += 1;
   }
  }
for (let goodfeature of goodFeatures){
  if (abs(dog.x-goodfeature.x) < 50 && abs(dog.y-goodfeature.y)<30){
    goodfeature.x=1000;
    timer+=10;
}}
for (let badfeature of badFeatures){
  if (abs(dog.x-badfeature.x) < 50 && abs(dog.y-badfeature.y)<30){
    badfeature.x=1000;
    timer-=5; 
}}

  //counter
  // the following 10 and belonging lines of code were adapted from https://youtu.be/h8dHw1-WbAY?si=athmfyTw1v8b0p18 
  push();
  timer -= 1/60;
  fill(255,0,0);
  textSize(20);
  text("Timer:", 9,50);
  text(round(timer),70,50);
  textSize(20);
  text("Score:", 10,70);
  text(round(score),73,70);
  pop();

}

   
//results screen
function resultScreen() {
  image(imgResult, 445, 300 ,width,height);
}

function mechanics() {
  dog.movement();
for (let platform of platforms){
  dog.collision(platform);
}
 
} 


function draw() {

  if(timer <= 0){
    state = "result";
    timer = 0;
  } 

  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    mechanics();
    gameScreen();
    for (let sausage of sausages) {
      sausage.show();
    }
    for (let badFeature of badFeatures) {
      badFeature.movement();
      badFeature.show();
    }
    for (let goodFeature of goodFeatures) {
      goodFeature.movement();
      goodFeature.show();
    }
  } else if (state === "result") {
    resultScreen();
  } else if ( state === "rules") {
    instructionScreen();
  }
} 


//change beetween screens while clicking
function mouseClicked() {

  if (state === "start" && mouseX > 420 && mouseX < 520 && mouseY > 525 && mouseY < 580 ) {
    state = "rules";
  } else if (state === "start" && mouseX > 315 && mouseX < 615 && mouseY > 400 && mouseY < 510 ) {
    state = "game";
  }else if (state === "rules" && mouseX > 0 && mouseX < 885 && mouseY > 0 && mouseY < 600) {
    state = "start";
  }else if (state === "result" && mouseX > 0 && mouseX < 885 && mouseY > 0 && mouseY < 600) {
      state = "start";
  }
}