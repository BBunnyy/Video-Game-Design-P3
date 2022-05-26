//block base class, for setting position, size, etc.
class Block {
  constructor(x, y) {
    this.baseX = x;
    this.x = x;
    this.y = y;
    this.size = 20;

    this.type = this.setType();
  }

  draw() {}

  updatePos() {
    this.x = this.baseX - xAdjust;
  }
}
