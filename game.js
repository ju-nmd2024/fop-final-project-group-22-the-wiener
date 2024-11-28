// variable for guetto image 
let img;

function preload() {
  img = loadImage("ghetto.png");
}


function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0, 0, 0);
  //image guetto
  imageMode (CENTER);
  image(img, width/2, height/2, width, height);
}

