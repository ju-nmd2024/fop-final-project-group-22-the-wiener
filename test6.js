// variable for guetto image
let platforms =[];
let currentImageIndex= 0;
let nextImageIndex= 1;
let images = [];
let sausages =[];
let badFeatures= [];
let velocityImage= 5;
let offset = 0;
let state = "start";
let gameState = true;
// variables for the mechanics
// let velocityX = 0;
// let velocityY = 0;
// let acceleration = 0.1;
// let velocityDog= 0.8;
// let accelerationDog= 0.2;
// let boostVelocityDog= 0.7;
// variables for charakters
// let imgDogX= 300;
// let imgDogY= 505;

let imgPoliceX = 84;
let imgPoliceY = 440; 
let timer = 127;
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
    imgGewonnen = loadImage("ergebnisgut.png");
    imgVerloren = loadImage("ergebnisverloren.png");
  
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

  // badCollision(){
  //   if (abs(dog.x - badFeatures[i].x) < 50 && abs(dog.y - badFeatures[i].y) < 30){
          
  //   }
  // }
} 

class Dog {
    constructor (x, y) {
        this.x = x;
        this.y = y; 
        this.width = 140;
        this.height = 100;
        this.falling = true;
    }
    show (){
        image(imgDog, this.x, this.y, this.width, this.height);
        //console.log("x:" + this.x + "y:" + this.y);
    }
    movement() {
        if (keyIsDown(UP_ARROW)) {
            this.y -=30;
            this.falling = true;
          }
          if (this.falling === true) {
            this.y = this.y +10;
          }
          
    } 
    collision (platform) {
      if (this.y  >= 505) {
        this.y = 500; 
        this.falling = false; 
    } else if (this.x > platform.x &&
        this.x < platform.x + platform.width &&
        this.y  >= platform.y && 
        this.y  <= platform.y + 10) { 
        this.falling = false; 
        this.y = platform.y - this.height ; 
        
    } else {
        
        this.falling = true;
    }

    
}}

let dog = new Dog(300, 505);

function setup() {
  createCanvas(885, 600);
  frameRate(30); // control the frame rate for smoother image changes
  for (let i = 0; i < 10; i++) {
    sausages[i] = new Sausage(400 + 100 * i, 510);
  }
  badFeatures.push(new BadFeature(400, 510, imgTrashCan));
  badFeatures.push(new BadFeature(700, 510, imgShoppingbags));
  badFeatures.push(new BadFeature(1000, 510, imgPant));
  badFeatures.push(new BadFeature(1300, 510, imgDynamite));
  badFeatures.push(new BadFeature(1600, 510, imgConstruction));
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

//
for (let i = sausages.length - 1; i >= 0; i--) {
  sausages[i].movement();
  sausages[i].show();

   // sausages when being eaten by the dog
   if (abs(dog.x - sausages[i].x) < 50 && abs(dog.y - sausages[i].y) < 30) {
     sausages[i].x=-1000;
     score += 1;
   }
for (let badfeature of badFeatures){
  if (abs(dog.x-badfeature.x) < 50 && abs(dog.y-badfeature.y)<30){
    badfeature.x=1000;
    timer-=5; 
  }}

  //counter
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
}

   
//results screen
function resultScreen() {
  //background(255, 255, 255);
  image(imgGewonnen, 445, 300,width,height);
  fill(55, 155, 55);
  textStyle(BOLD);
  textSize(50);
  text("ERGEBNIS", 300, 266);
}

function mechanics() {
   
for (let platform of platforms){
  dog.collision(platform);
}
dog.movement(); 
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
