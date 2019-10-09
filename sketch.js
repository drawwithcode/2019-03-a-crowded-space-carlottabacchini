var xserp = [];
var yserp = [];
var segNum = 25;
var segLength = 5;
var ballNumber = 25;
var balls = [];
var counter = 0;

for (var j = 0; j < segNum; j++) {
  xserp[j] = 0;
  yserp[j] = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img1 = loadImage("Mela.png");

  for (var i = 0; i < ballNumber; i++) {
    var myBall = new Ball(random(11, width - 100), random(11, height - 100), 30);
    balls.push(myBall);
  }


}

function draw() {
  background(1, 3, 30);

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

  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  for (var j = 0; j < xserp.length - 1; j++) {
    strokeWeight(30);
    stroke(48, 146, 26);
    dragSegment(0, mouseX, mouseY);
    dragSegment(j + 1, xserp[j], yserp[j]);
  }


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

  var yDir = 1;
  var xDir = 1;

  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.dimension) {
      this.dimension = 0;
      segLength = segLength + 1;
    }
  }

  this.display = function() {
    fill(this.color);
    noStroke();
    //ellipse(this.x, this.y, this.dimension);
    image(mela,this.x,this.y,32,32)
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
