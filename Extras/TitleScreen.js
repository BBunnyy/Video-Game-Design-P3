//function that draws the
function drawTitle() {
  var shiftX = 130;

  //DRAW TITLE TEXT
  fill(50);
  noStroke();
  textSize(80);
  textStyle(NORMAL);
  text("Bank Heist", 5, 75);

  //DRAW INSTRUCTIONS
  textSize(15);
  text("Instructions:", 260, 265);
  text("Press SPACE to shoot,", 225, 280);
  text("shoot to kill enemies,", 233, 295);
  text("shoot to break crates!", 231, 310);
  text("UP and DOWN to move!", 219, 325);
  text("LEFT and RIGHT to rotate!", 208, 340);

  text("Collect all the MONEY BAGS,", 199, 365);
  text("and avoid all the Cops to win!", 199, 380);
  textStyle(BOLD);
  fill(255, 0, 0);
  text("PRESS ANY KEY OR CLICK TO START", 120, 395);
  textStyle(NORMAL);

  //DRAW ROBBER RUNNING FROM THE COPS
  translate(-shiftX, -10);

  //draw money falling from robber
  textSize(15);
  fill(0, 200, 0);
  rect(330, 250, 30, 15);
  rect(340, 210, 30, 15);
  rect(380, 230, 30, 15);
  fill(0);
  text("$", 340, 263);
  text("$", 350, 223);
  text("$", 390, 243);

  //draw money bag that robber carries
  fill(171, 131, 96);
  triangle(250, 280, 260, 300, 270, 280);
  ellipse(300, 280, 65, 50);
  translate(300, 280);
  rotate(PI / 2);
  fill(0);
  textSize(30);
  text("$", -23, 10);
  text("$", -8, 10);
  text("$", 8, 10);
  rotate(-PI / 2);
  translate(-300, -280);

  //draw stick figure body of robber
  stroke(0);
  strokeWeight(10);
  line(210, 250, 230, 325);
  line(212, 260, 200, 300);
  line(200, 300, 170, 290);

  line(212, 260, 270, 280);
  line(230, 325, 200, 340);
  line(200, 340, 210, 380);
  line(230, 325, 250, 340);
  line(250, 340, 280, 330);

  //draw gun
  stroke(100);
  line(170, 280, 170, 300);
  line(170, 280, 140, 280);
  stroke(0);

  //draw robber's head
  strokeWeight(1);
  fill(252, 203, 154);
  ellipse(200, 200, 90, 100);
  fill(50);
  arc(200, 190, 95, 100, 180, 360);
  rect(150, 170, 100, 20);

  //draw stick figure cops chasing robber
  //cop 1
  translate(140, 0);
  scale(0.25);
  translate(900, 300);
  strokeWeight(10);
  line(210, 250, 230, 325);
  line(212, 260, 200, 300);
  line(200, 300, 170, 290);
  line(212, 260, 270, 280);
  line(230, 325, 200, 340);
  line(200, 340, 210, 380);
  line(230, 325, 250, 340);
  line(250, 340, 280, 330);
  strokeWeight(1);
  fill(252, 203, 154);
  ellipse(200, 200, 90, 100);
  fill(60, 60, 200);
  arc(200, 190, 95, 100, 180, 360);
  rect(150, 170, 100, 20);

  //cop 2
  translate(200, 200);
  strokeWeight(10);
  line(210, 250, 230, 325);
  line(212, 260, 200, 300);
  line(200, 300, 170, 290);
  line(212, 260, 270, 280);
  line(230, 325, 200, 340);
  line(200, 340, 210, 380);
  line(230, 325, 250, 340);
  line(250, 340, 280, 330);
  strokeWeight(1);
  fill(252, 203, 154);
  ellipse(200, 200, 90, 100);
  fill(60, 60, 200);
  arc(200, 190, 95, 100, 180, 360);
  rect(150, 170, 100, 20);
  translate(-200, 0);

  resetMatrix();
}
