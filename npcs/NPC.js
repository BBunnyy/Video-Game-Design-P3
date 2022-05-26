//Base class for an NPC
class NPC {
  //allows for extra information for subclasses or overwrites
  init() {}

  constructor(x, y) {
    //Set NPC info, start location, size, direction to face, health
    this.baseX = x;
    this.x = x;
    this.y = y;
    this.health = 1;
    this.size = 15;
    this.dir = "U";

    this.init();
  }

  updatePos() {
    //print("UPDATING POS")
    this.x = this.baseX - xAdjust;
  }

  //default NPC is a small circle
  draw() {
    fill(150);
    circle(this.x, this.y, 10);
  }

  //handle if the NPC takes damage
  hurt(dmg) {
    this.health -= dmg;
    return this.health;
  }
}
