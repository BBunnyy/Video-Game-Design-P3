// //SET THE TILEMAP
var tilemap = [
  "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
  "se    c       ssssc!!cssss                              c ps",
  "s   ! c   e    ss!c  c!ss                c               c s",
  "s     c         sc    cs                c!c         e     cs",
  "s !  c           s    s       e          c                 s",
  "s   c              ee                      e               s",
  "sccc        c                        sscccss       !       s",
  "s          c!c                      s       s   e          s",
  "s           c              c       s         s         s  ss",
  "s                   e     c!c      s         s            cs",
  "s                          c       c   !e!   c           c s",
  "s  s                       e       c   e!e   c     e      !s",
  "s           e                      c   !e!   c            cs",
  "s e  s           c                 s         s             s",
  "s               c!c          c     s         s         s  ss",
  "s      s         c          c!c     s       s              s",
  "ssc                   e      c       sscccss         e    cs",
  "s  c  e  s                                               c s",
  "s! s                                                    c !s",
  "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
];

//INITIALIZE GLOBAL VARIABLES
var player;
var xAdjust;
var origEn = [];
var enemies = [];
var origPrizes = [];
var prizes = [];
var origWall = [];
var wall = [];
var gameStart;
var lost;
var won;
var prizeImg;
var initPos;

//PARSE THE TILE MAP TO SET GAME OBJECTS:
function setTiles() {
  for (var row = 0; row < tilemap.length; row++) {
    for (var col = 0; col < tilemap[row].length; col++) {
      switch (tilemap[row][col]) {
        case "s": //Steel Block tile found! Add to walls!
          wall.push(new Steel(col * 20 + 10, row * 20 + 10));
          break;
        case "c": //Crate Block tile found! Add to walls!
          wall.push(new Crate(col * 20 + 10, row * 20 + 10));
          break;
        case "p": //Player tile found! Spawn player!
          player = new Player(col * 20 + 10, row * 20 + 10);
          if (player.x > 200 && player.x < 1000) {
            xAdjust = player.x - 200;
            player.x = 200;
          } else if (player.x >= 1000) {
            player.x -= 800;
            xAdjust = 800;
          }
          break;
        case "e": //Enemy found! Spawn Enemy!
          enemies.push(new Pig(col * 20 + 10, row * 20 + 10));
          break;
        case "!": //Price found! Spawn Prize!
          prizes.push(new Prize(col * 20 + 10, row * 20 + 10));
          break;
        default:
          break;
      }
    }
  }
  //verify number of enemies and prizes
  print(enemies.length);
  print(prizes.length);
}

//update the positions of elements if the screen is shifted
function updatePositions() {
  for (var z1 = 0; z1 < enemies.length; z1++) {
    enemies[z1].updatePos();
  }
  for (var w1 = 0; w1 < wall.length; w1++) {
    wall[w1].updatePos();
  }
  for (var p1 = 0; p1 < prizes.length; p1++) {
    prizes[p1].updatePos();
  }
  for (var b1 = 0; b1 < player.bullets.length; b1++) {
    player.bullets[b1].updatePos();
  }
}

//Function to manage drawing and movement of enemies (see Pig.js for more)
function drawEnemies() {
  for (var eCount = 0; eCount < enemies.length; eCount++) {
    enemies[eCount].draw();
    enemies[eCount].move();
  }
}
//Function to manage collision check of enemies (see Pig.js for more)
function checkEnemies() {
  for (var eCount = 0; eCount < enemies.length; eCount++) {
    enemies[eCount].checkCollision();
  }
}

//Function to manage drawing of prizes (see Prize.js for more)
function drawPrizes() {
  for (var pCount = 0; pCount < prizes.length; pCount++) {
    prizes[pCount].draw();
  }
}

//Function to manage drawing of wall objects (Steel or Crates) (see Steel.js, Crate.js for more)
function drawWall() {
  for (var wallCount = 0; wallCount < wall.length; wallCount++) {
    wall[wallCount].draw();
  }
}

//On Key release, start the game if on home screen
function keyReleased() {
  if (gameStart == false) {
    gameStart = true;
    lost = false;
    won = false;
  }
}

//on mouse click, start the game if on home screen
function mouseClicked() {
  if (gameStart == false) {
    gameStart = true;
    lost = false;
    won = false;
  }
}

//Set up the custom character, load the tiles, and set game states
function setup() {
  frameRate(60);
  createCanvas(400, 400);
  angleMode(DEGREES);

  xAdjust = 0;
  initPos = true;

  prizeImg = customChar();

  setTiles();
  gameStart = false;
}

//Main loop
function draw() {
  background(200);
  //If not started, draw the instruction/home screen (See Extras/TitleScreen.js for more)
  if (gameStart == false) {
    drawTitle();
  }
  //If Game has started, and the player has not lost or won
  else if (lost == false && won == false) {
    player.draw(); //draw the player
    player.move(); //move the player
    drawEnemies();
    updatePositions();
    player.collisionCheck(); //if the player's movement causes a collision, handle collision
    checkEnemies();
    player.shoot(); //allow the player to shoot if SPACE is pressed

    //Drawing prizes, adversaries, and walls
    drawPrizes();
    drawWall();

    //If player is touched, they lose
    if (player.health == 0) {
      gameOver = true;
      lost = true;
    }
    //if player collects all the prizes, they win
    else if (prizes.length == 0) {
      gameOver = true;
      won = true;
    }
  }
  //if the player loses, reset parameters, and play the losing screen animation
  else if (lost == true) {
    GameOverAni();
  }
  //if the player wins, reset parameters, and play the winning screen animation
  else if (won == true) {
    GameWinAni();
  }
}
