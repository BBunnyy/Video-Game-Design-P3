//Class object for the player character
class Player {
  //initialize player location, speed, health, size, direction, and give them an array to manage bullets fired
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastXAdjust = 0;
    this.movedU = false;
    this.movedD = true;

    this.speed = 1;

    this.health = 1;
    this.size = 10;
    this.angle = 0;
    this.angleStep = 2;
    this.step = new p5.Vector(1, 0);

    this.bullets = [];
    this.lastShot = -100; //before any shot could have been fired

    this.collision = false;
  }

  //draw the player based on their direction
  draw() {
    for (var bullCount = 0; bullCount < this.bullets.length; bullCount++) {
      this.bullets[bullCount].draw();
    }

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(40);
    circle(0, 0, this.size);
    fill(255);
    noStroke();
    circle(3, 0, this.size / 3);
    pop();
  }

  //move the player based on arrow key pressed, and rotate them in the direction moving
  move() {
    this.lastX = this.x;

    var adjustMAX = 800;
    this.movedU = false;
    this.movedD = false;

    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= this.angleStep;
      this.step.rotate((-this.angleStep * PI) / 180);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += this.angleStep;
      this.step.rotate((this.angleStep * PI) / 180);
    }
    if (keyIsDown(UP_ARROW)) {
      this.movedU = true;
      if (
        (this.x <= 200 && xAdjust <= 0) ||
        (this.x >= 200 && xAdjust >= adjustMAX)
      ) {
        this.x += this.step.x;
      }
      //crossing into map movement
      else if (xAdjust <= 0 || xAdjust >= adjustMAX) {
        xAdjust += this.step.x;
        this.x = 200;
      } else if (xAdjust > 0 && xAdjust < adjustMAX) {
        this.lastXAdjust = xAdjust;
        xAdjust += this.step.x;
      }

      this.y += this.step.y;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.movedD = true;
      if (
        (this.x <= 200 && xAdjust <= 0) ||
        (this.x >= 200 && xAdjust >= adjustMAX)
      ) {
        this.x -= this.step.x;
      }
      //crossing into map movement
      else if (xAdjust <= 0 || xAdjust >= adjustMAX) {
        xAdjust -= this.step.x;
        this.x = 200;
      } else if (xAdjust > 0 && xAdjust < adjustMAX) {
        this.lastXAdjust = xAdjust;
        xAdjust -= this.step.x;
      }

      this.y -= this.step.y;
    }
  }

  //check various collisions
  collisionCheck() {
    var adjustMAX = 800;
    //Check collision with enemies
    for (var z0 = 0; z0 < enemies.length; z0++) {
      if (
        this.size / 2 + enemies[z0].size / 2 >
        dist(this.x, this.y, enemies[z0].x, enemies[z0].y)
      ) {
        this.health = 0; //kill player if they touch enemy
      }
    }

    //Check collision with walls
    this.collision = false;
    for (var w0 = 0; w0 < wall.length; w0++) {
      if (
        dist(this.x, 0, wall[w0].x, 0) <= (this.size + wall[w0].size) / 2 &&
        dist(this.y, 0, wall[w0].y, 0) <= (this.size + wall[w0].size) / 2
      ) {
        this.collision = true;
        //undo the movement from move() if you move into the wall, depending on direction moved
        if (keyIsDown(UP_ARROW)) {
          if (xAdjust > 0 && xAdjust < adjustMAX) {
            xAdjust -= this.step.x;
          } else {
            this.x -= this.step.x;
          }
          this.y -= this.step.y;
        }
        if (keyIsDown(DOWN_ARROW)) {
          if (xAdjust > 0 && xAdjust < adjustMAX) {
            xAdjust += this.step.x;
          } else {
            this.x += this.step.x;
          }
          this.y += this.step.y;
        }
      }
    }

    //check for collision with prizes
    for (var p0 = 0; p0 < prizes.length; p0++) {
      if (
        this.size / 2 + prizes[p0].size / 2 >
        dist(this.x, this.y, prizes[p0].x, prizes[p0].y)
      ) {
        prizes.splice(p0, 1); //remove prize, if collided
      }
    }
  }

  shoot() {
    //place to shoot, limit to 3 per second
    if (keyIsDown(32) && frameCount - 20 > this.lastShot) {
      //"fire" bullet
      this.bullets.push(new Bullet(this.x, this.y, this.angle));
      this.lastShot = frameCount; //frame count of last shot bullet
    }

    //if the bullet collides with something
    for (var bullCount = 0; bullCount < this.bullets.length; bullCount++) {
      var didHit = this.bullets[bullCount].move();
      if (didHit != "X") {
        this.bullets.splice(bullCount, 1);
      }
    }
  }
}
