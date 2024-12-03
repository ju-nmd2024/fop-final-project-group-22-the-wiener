// variable for guetto image
//var platform1 = [];
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
let acceleration = 0.4;
// variables for charakters
let imgDogX= 300;
let imgDogY= 500;
let imgPoliceX = 80;
let imgPoliceY = 440; 
let lastDogY;
let sausages = [];

//array for the good features
let feature = [
  // the properties are organized in a way that the collision has the same effect if those are good or bad features
  // for the good features
  //"type" is for classifying and separating the good and the bad features 
  { x: 600, y: 300, type: "good", img: "imgBerlinerLuft" },
  { x: 1550, y: 425, type: "good", img: "imgClubmate" },
  { x: 1200, y: 200, type: "good", img: "imgPills" },
  // for the bad features
  { x: 700, y: 500, type: "bad", img: "imgConstruction" },
  { x: 1300, y: 350, type: "bad", img: "imgDynamite" },
  { x: 900, y: 450, type: "bad", img: "imgPant" },
  { x: 1100, y: 300, type: "bad", img: "imgShoppingbags" },
  { x: 800, y: 400, type: "bad", img: "imgTrashCan" }
];

function drawFeatures(){
  for (let i = 0 ; i < 3; i ++){
      let feature = features[i];
      image(feature.img, feature.x, feature.y, 50, 50 );
  }
}

let remainingFeatures = [];

function checkfeatureCollision(){
  for (let i = 0; i < drawFeatures.length; i++){
      let feature = features[i];
      if(
          imgDogX < feature.x + 50 && imgDogX + 100 > feature.x &&
          imgDogY < feature.Y + 50 && imgDogY + 80 > feature.y
      ){
          if (feature.type === "good"){
              //if the feature type is good and the dog collects it then the velocity of the dog will increase
              velocityDogX += 1;
          } else if (feature.type === "bad"){
              //and if the feature type is bad then it will decrease the velocity
              velocityDogX -= 1;
              //add an if statement for saying "when the velocity of the Dog is equals to 0 then Game Over"
              if (velocityDogX <= 0){
                  //when you have the Game Over screen connect it here 
                  //gameState = "gameOver"
              }
          }
      } else {
          remainingFeatures.push(feature);
      }
  }
}

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

function setup() {
  createCanvas(885, 600);
  frameRate(30); 
  sausages.push(new Sausage(th))
  // control the frame rate for smoother image changes
  // for (let i = 0; i < 1; i++) {
  //   platform1[i] = new Platformbl();
  // }
}

//start screen
function startScreen() {
  background(255, 255, 255);
  
    //image Skizze of the Wiener
    image(imgSkizze, 50, -10, 800, 500);

  //sausage
  noStroke();
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
  // TEXT
  fill(255, 255, 255);
  textSize(20);
  text("click the screen to start ;)", 360, 460);
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
  image(imgPolice, imgPoliceX, imgPoliceY, 150, 200);
  image(imgDog, imgDogX, imgDogY, 150, 100);
  // for (let i = 0; i < 1; i++) {
  //   platform1[i].show();
  //   platform1[i].movement();
  // }
  // lastDogY=0; //equal to the dogY
  if (imgPoliceX >= imgDogX - 50) {
    state = "result"; // Game Over
  }

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
  if (gameState === "game") {
    // apply gravity to vertical velocity
    velocityX = velocityX + acceleration;

    imgPoliceX = imgPoliceX + velocityX * 0.3;
    // Update vertical position
    imgDogY = imgDogY + velocityY;
    // Move charater forward
    imgDogX = imgDogX + velocityX;
  } 
  
  if (keyIsDown(UP_ARROW)) {
    y = y - 100;
  } else {
    y = 1420;
  }
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

for (let sausage of sausages){
image(imgSausage, sausage.x, sausage.y, sausage.width, sausage.height);
sausage.x -= 10;
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

class Sausage {
  constructor () {
    this.x = 320;
    this.y = 500;
    this.width = 250;
    this.height = 250;
  }
  draw() {
    image(this.x, this.y, this.width, this.height);
  }
  }

// class Platformbl {
//   constructor() {
//     this.platformX = 10;
//     this.platformY = 10;
//   }
//   show() { 
//     fill(0, 100, 0);
//     rect(this.platformX + 400, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 500, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 600, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 800, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 900, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 1000, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 1300, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 1500, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 1600, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 1700, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 1800, this.platformY + 300, 100, 20, 20);
//     rect(this.platformX + 1900, this.platformY + 400, 100, 20, 20);
//     image(imgBerlinerLuft, this.platformX + 650, this.platformY + 315, 30, 80);
//     image(imgTrashCan, this.platformX + 700, this.platformY + 500, 100, 100);
//     image(imgPills, this.platformX + 1550, this.platformY + 425, 80, 80);
//     image(imgShoppingbags,this.platformX + 1200, this.platformY + 500,100,100);
//   }

//   movement(funX, theY, lastTheY) {
//     if(
//       funX + 50>= this.platformX &&
//       funX <= this.platformX + 50 &&
//       theY >= this.platformY - 60 &&
//       theY + 50 <= this.platformY &&
//       theY >= lastTheY 
//     ) { 
//       //the bottom of the dog should be equal to the top Y value of the platform
//     }

//     //platform moves in the x direction
//     this.platformX = this.platformX - 3;
  
//   }
// }
 