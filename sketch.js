var xserp = [];
var yserp = [];
var segNum = 25; // segments of the snake
var segLength = 5; // length of the snake
var ballNumber = 5;
var balls = [];
var counter = 0;
var img1;

// setup the snake
for (var j = 0; j < segNum; j++) {
  xserp[j] = 0;
  yserp[j] = 0;
}

function preload() {
  img1 = loadImage("Mela.png"); //img apple
  blu = loadImage("none.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);


// setup the apples
  for (var i = 0; i < ballNumber; i++) {
    var myBall = new Ball(random(11, width - 100), random(11, height - 100), 60);
    balls.push(myBall);
  }


}

function draw() {
  background(1, 3, 30);



  for (var i = 0; i < balls.length; i++) {
    balls[i].move();    //call the function move to make the apples effectively moves
    balls[i].display(); //call the function diplay to make the apples effectively appear
  }

  for (var j = 0; j < xserp.length - 1; j++) {
    strokeWeight(30);
    stroke(48, 146, 26);
    dragSegment(0, mouseX, mouseY);
    dragSegment(j + 1, xserp[j], yserp[j]);
  }

  //text
    push()
      let s = 'TRY TO GET ALL THE APPLES AND SEE WHAT HAPPENS';
      stroke('white');
      strokeWeight(0.5);
      noFill()
      textSize(33);
      textStyle(BOLD)
      textAlign(CENTER,CENTER);
      text(s, width/2, height/15);
    pop()

}

function mousePressed() {
  for (var l = 0; l < balls.length; l++) {
  balls[l].click();
  }
}


function Ball(_x, _y, _dimension) {
  this.x = _x;
  this.y = _y;
  this.dimension = _dimension;
  this.color = 'white';
  this.speedx = random(1, 10);
  this.speedy = random(1, 5);
  this.counter = counter;
  this.mela = img1;

  var yDir = 1;
  var xDir = 1;

  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.dimension) {
      //this.dimension = 0;
      this.mela = blu;
      segLength = segLength + 1;
    }
  }

  this.display = function() {
    fill(this.color);
    noStroke();
    //ellipse(this.x, this.y, this.dimension);
    image(this.mela,this.x,this.y,this.dimension,this.dimension);
  }

  this.move = function() {
    this.x += this.speedx * xDir;
    this.y += this.speedy * yDir;


    if (this.y >= height - 10 || this.y <= 10) {
      yDir = -yDir;
    }

    if (this.x >= width - 10 || this.x <= 10) {
      xDir = -xDir;
    }
  }


}

function dragSegment(j, xin, yin) {
  var dx = xin - xserp[j];
  var dy = yin - yserp[j];
  var angle = atan2(dy, dx);
  xserp[j] = xin - cos(angle) * segLength;
  yserp[j] = yin - sin(angle) * segLength;
  segment(xserp[j], yserp[j], angle);
}

function segment(xserp, yserp, a) {
  push();
  translate(xserp, yserp);
  rotate(a);
  line(0, 0, segLength, 0);
  smooth()
  pop();
}
