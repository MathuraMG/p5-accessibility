function setup() {
  createCanvas(300,200);
  background(255);
}

function draw() {
  // try changing the values of each shape and their fill() values
  fill(0);
  ellipse(50,50,20,30);
  fill(255,0,0);
  rect(150,50,100,50);
  fill(0,255,0);
  triangle(50,150,100,150,100,100);
  fill(0,0,255);
  quad(200,150,250,150,250,180,200,190);
}
