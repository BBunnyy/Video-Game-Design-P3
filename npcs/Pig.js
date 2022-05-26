//Object class for game adversaries (aka Cops), derived from NPC class
class Pig extends NPC {
  //Give the Cop a speed, and size to start as, and set a random variable used to rotate their lights
  init() {
    this.size = 10;
    this.step = new p5.Vector(1.5, 0);
    this.speed = 0.5;
    this.angle = 0;
    this.rotate = random(0, 360); //random lights starting position
  }

  //function to draw police lights that spin around the cops
  drawLights() {
    noStroke();
    //to make a gradient, draw increasingly bigger arcs, with transparency, that overlap
    for (var r = this.size; r <= this.size * 4; r++) {
      fill(255, 0, 0, 80 / this.size); //red light
      arc(this.x, this.y, r, r, this.rotate, this.rotate + 80);
      fill(0, 0, 255, 80 / this.size); //blue light
      arc(this.x, this.y, r, r, this.rotate + 180, this.rotate + 260);
    }
    this.rotate += 2; //speed at which to spin lights
  }

  //draw the Cop and Lights in the direction they travel
  draw() {
    this.drawLights();
    push();
    translate(this.x, this.y);
    //print(this.angle)
    rotate(this.angle);
    stroke(0);
    fill(0, 0, 255);
    circle(0, 0, this.size); //draw the cop as a circle
    noStroke();
    fill(255, 215, 0); //Gold color
    ellipse(this.size / 3, 0, this.size / 4, this.size / 2); //add an "eye" to convey direction
    pop();
  }

  //handle cop movement, depending on their direction
  move() {
    //if within 120 pixels of player, chase the player
    if (dist(this.x, this.y, player.x, player.y) <= 120) {
      this.step.set(player.x - this.x, player.y - this.y);
      this.step = this.step.normalize().mult(this.speed);
      this.angle = (this.step.heading() * 180) / PI;
      this.baseX += this.step.x;
      this.y += this.step.y;
    }
  }

  //check for and handle collision
  checkCollision() {
    //Check collision with walls
    for (var w0 = 0; w0 < wall.length; w0++) {
      //print(this.x)
      if (
        dist(this.x, 0, wall[w0].x, 0) <= (this.size + wall[w0].size) / 2 &&
        dist(this.y, 0, wall[w0].y, 0) <= (this.size + wall[w0].size) / 2
      ) {
        //undo the movement from move() if you move into the wall, depending on direction traveling (I.e. step backwards)
        this.baseX -= this.step.x;
        this.y -= this.step.y;
      }
    }
  }
}
