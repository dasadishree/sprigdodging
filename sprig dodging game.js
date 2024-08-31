const player = "p";
const obstacle = "o";

setLegend(
  [obstacle, bitmap`
................
........0000....
.......00..0639.
.......0........
......LLLL......
.....000000.....
....00000200....
...0000000200...
..000000000200..
..000000000000..
..000000000000..
..000000000000..
...0000000000...
....00000000....
.....000000.....
................`],
  [player, bitmap`
................
.000.000000.000.
.0.000....000.0.
...0........0...
..00.0...0..00..
..0..0...0...0..
..0..........0..
..000000000000..
...0555555550...
...0555555550...
...0555555550...
...0555055550...
...0...0....0...
...0333033330...
...0333033330...
...0000000000...`]
);
setMap(map`
........
........
........
........
........
........
........
...p....`);
var gameRunning = true;

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 7) {
      obstacles[i].remove();
    }
  }
}
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}

var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
   if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);
