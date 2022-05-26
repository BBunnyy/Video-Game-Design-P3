//class for bullets being shot
class Bullet {
  constructor(x, y, angle) {
    //initialize position and direction
    this.x = x;
    this.baseX = x;
    this.y = y;
    this.step = new p5.Vector(2, 0);
    this.step = this.step.rotate((angle * PI) / 180);
    this.xStepOrig = this.step.x;
    this.size = 5;
  }

//   Move bullets based on where the player is on the scrolling map
  updatePos() {
    this.x = this.baseX;
    if (
      xAdjust > 0 &&
      xAdjust < 800 &&
      player.movedU == true &&
      player.collision == false
    ) {
      this.step.x = this.xStepOrig - player.step.x;
    } else if (
      xAdjust > 0 &&
      xAdjust < 800 &&
      player.movedD == true &&
      player.collision == false
    ) {
      this.step.x = this.xStepOrig + player.step.x;
    } else {
      this.step.x = this.xStepOrig;
    }
  }

  //draw the bullet (red rectangle, parallel to direction of travel)
  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 0, 0);
    circle(0, 0, this.size);
    pop();
  }

  //move the bullet continuously
  move() {
    //check if it hits anything
    var checkHit = this.hit();
    // print("x = ", this.x, " y = ", this.y)
    // print("base x = ", this.x)
    if (checkHit == "X") {
      //if it hits nothing, move normally
      this.baseX += this.step.x;
      this.y += this.step.y;
    }

    return checkHit; //return what is hit (debugging purposes)
  }

  //check for hits (collision)
  hit() {
    var hit = "X"; //default is hit nothing

    //check if bullet hits walls:
    for (var i0 = 0; i0 < wall.length; i0++) {
      if (
        this.size / 2 + wall[i0].size / 2 >
        dist(this.x, this.y, wall[i0].x, wall[i0].y)
      ) {
        hit = wall[i0].type; //what kind of wall was hit?

        if (hit == "c") {
          //if the wall was a crate, destroy it
          wall.splice(i0, 1);
        }
      }
    }

    //check if it hits any enemies
    for (var i1 = 0; i1 < enemies.length; i1++) {
      if (
        this.y > enemies[i1].y - 7 &&
        this.y < enemies[i1].y + 7 &&
        this.x <= enemies[i1].x + 7 &&
        this.x >= enemies[i1].x - 7
      ) {
        if (enemies[i1].hurt(1) <= 0) {
          //if enemy is hit, damage them, if the enemy is killed, remove them from game
          enemies.splice(i1, 1);
        }

        hit = "e"; //enemy was hit
      }
    }

    return hit;
  }
}
