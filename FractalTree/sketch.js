
var angle=PI/4;
var slider;

function setup() {
    createCanvas(600,600);
    slider=createSlider(0,TWO_PI,PI/4,0.001);
}

function draw() {
  background(51);
 // ellipse(200,200,50,100);
    var len=150;
    angle=slider.value();
    stroke(255);
    translate(300,height);
    branch(len);
}

function branch(len){
    
    line(0,0,0,-len);
    translate(0,-len);
    if(len>2){
        push();
        rotate(angle);
        branch(0.67*len);
        pop();
        push();
        rotate(-angle);
        branch(0.67*len);
        pop();
    }
        
}