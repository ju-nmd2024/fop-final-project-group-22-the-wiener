// variable for guetto image
let platforms =[];
let currentImageIndex= 0;
let nextImageIndex= 1;
let images = [];
let velocityImage= 5;
let offset = 0;
let state = "start";
let gameState = true;
// variables for the mechanics
// let velocityX = 0;
// let velocityY = 0;
// let acceleration = 0.1;
let velocityDog= 0.8;
let accelerationDog= 0.2;
let boostVelocityDog= 0.7;
// variables for charakters
// let imgDogX= 300;
// let imgDogY= 505;

let imgPoliceX = 84;
let imgPoliceY = 440;


   
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
  
    //store images in an array
    images = [img, imgTwo, imgThree, imgFour];
  }
 
  class Platform{
    constructor (x, y){
        this.x = x;
        this.y = y;
    }
    show (){
        push();
        translate(this.x, this.y);
        fill (100, 100, 100);
        rect (0,0, 100, 20, 20); 
        pop();
    }
}

for (let i = 0; i< 4; i++) {
    platforms [i] = new Platform (200 + 50 * i, 400 = 50 * i);
}


class Dog {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    show (){
        image(imgDog, this.x, this.y, 140, 100);
    }
    movement() {
        if (keyIsDown(UP_ARROW)) {
            this.y -=30;
          }
          if (this.y < 500) {
            this.y = this.y +10;
          }
    }
}
let dog = new Dog(300, 505);

function setup() {
  createCanvas(885, 600);
  frameRate(30); // control the frame rate for smoother image changes
  
//   for (let i=0;i<1;i++)
//   {
//     platform1[i]= new Platformbl();
//   }
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

  //image guetto
  imageMode(CENTER);
 image(images[currentImageIndex], width/2 + offset, height/2, 950, 600);
 image(images[nextImageIndex], width + width/2 + offset, height/ 2, 950,600);
image (imgPolice, imgPoliceX, imgPoliceY, 150, 200);
for (let platform of platforms){
    platform.show();
}
//image (imgDog, imgDogX, imgDogY, 140, 90);
dog.show();
//   for (let i=0;i<1;i++) {
//       platform1[i].show();
//     //   platform1[i].movement();
//     }
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
  //game state and gravity logic
//   image(imgDog, imgDogX, imgDogY, 30, 30);
    
//   if (keyIsDown(UP_ARROW)) {
//     imgDogY -=30;
//   }
//   if (imgDogY < 500) {
//     imgDogY = imgDogY +10;
//   }
//dog.show();
dog.movement();
} 


function draw() {


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

// class Platformbl{
//     constructor(){
//         this.platformX = 10;
//         this.platformY= 10;
//     }
//     show(){
//         fill(0, 100, 0);
//   rect(this.platformX + 400, this.platformY + 450, 100, 20, 20);
//   rect(this.platformX + 500, this.platformY + 400, 100, 20, 20);
//   rect(this.platformX + 600, this.platformY + 350, 100, 20, 20);
//   rect(this.platformX + 800, this.platformY + 450, 100, 20, 20);
//   rect(this.platformX + 900, this.platformY + 400, 100, 20, 20);
//   rect(this.platformX + 1000, this.platformY + 450, 100, 20, 20);
//   rect(this.platformX + 1300, this.platformY + 350, 100, 20, 20);
//   rect(this.platformX + 1500, this.platformY + 450, 100, 20, 20);
//   rect(this.platformX + 1600, this.platformY + 400, 100, 20, 20);
//   rect(this.platformX + 1700, this.platformY + 350, 100, 20, 20);
//   rect(this.platformX + 1800, this.platformY + 300, 100, 20, 20);
//   rect(this.platformX + 1900, this.platformY + 400, 100, 20, 20);
//     }
  
//     movement(){
//          //platform moves in the x direction
//   this.platformX = this.platformX - 2;
//   //reset the x value of the platform to 885, which is the width of the canvas so that it starts from the far right
//   if (this.platformX < -2000) {
//   this.platformX = width;
//   }
//     }
//   }
