var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = "images/galaxy.png";
var heroImage = new Image();
heroImage.src = "images/iron-man.png"
var hero = {
  x: 200,
  y: 200,
  DirX : 0,
  DirY : 0,
  Speed : 3
};

var monsterImage = new Image();
monsterImage.src = "images/villain.png";
var monster = {
  x: 300,
  y: 300,
  DirX : 1,
  DirY : 0,
  Speed : 5
};

 var goblinImage = new Image();
 goblinImage.src = "images/asteroid.png";
 var goblin1 = {
   x: 200,
   y: 300,
   DirX : 0,
   DirY : 0,
   Speed : 3
 };

 var goblin2 = {
    x: 400,
    y: 200,
    DirX : 0,
    DirY : 1,
    Speed :3
 };
 var enemies = [goblin1, goblin2];
 var game = {
   counter: 0,
   score: 0,
   score: 0,
   highScore: 0

 }

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.DirX = -1;
  } else if (key === 39) { // right
    hero.DirX = 1;
  } else if (key === 38) { // up
    hero.DirY = -1;
  } else if (key === 40) { // down
    hero.DirY = 1;
  }

  handleWrapping(hero);
});

window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.DirX = 0;
  } else if (key === 39) { // right
    hero.DirX = 0;
  } else if (key === 38) { // up
    hero.DirY = 0;
  } else if (key === 40) { // down
    hero.DirY = 0;
  }
});

function collision(hero, enemy) {
  // detect collision
    if (hero.x + 32 < enemy.x) {
      return false;
    } else if (enemy.x + 32 < hero.x) {
      return false;
    } else if (hero.y + 32 < enemy.y) {
      return false;
    } else if (enemy.y + 32 < hero.y) {
      return false;
    }
    return true;
}
//      heroImage.src= "images/hooray.png";

function handleWrapping(object) {
  if (object.x > 1000) {
    object.x = 0;
  }
  if (object.x < 0) {
    object.x = 1000;
  }
  if (object.y > 700) {
    object.y = 0;
  }
  if (object.y < 0) {
    object.y = 700;
  }
}

function updateEnemy(enemy){
  // change enemy direction
  if (game.counter % 50 === 0) {
    enemy.DirX = Math.floor(Math.random() * 3) - 1;
    enemy.DirY = Math.floor(Math.random() * 3) - 1;
  }
  // update enemy position
  enemy.x += enemy.DirX * enemy.Speed;
  enemy.y += enemy.DirY * enemy.Speed;
  handleWrapping(enemy);
}

function resetGame(){
  if(collision(hero,enemies)){
    game.score = 0;
  }
}

function main() {
  game.counter++;

  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);
  ctx.drawImage(goblinImage, goblin1.x, goblin1.y);
  ctx.drawImage(goblinImage, goblin2.x, goblin2.y);

  hero.x += hero.DirX * hero.Speed;
  hero.y += hero.DirY * hero.Speed;

  updateEnemy(monster);
  updateEnemy(goblin1);
  updateEnemy(goblin2);
  if (collision(hero, monster)) {
    game.score++;
    monster.x = Math.random() * 1000;
    monster.y = Math.random() * 700;
  }

  ctx.drawImage(monsterImage, monster.x, monster.y);
  ctx.font = "16px sans-serif";
  ctx.fillStyle  = "white";
  ctx.fillText('Score: ' + game.score, 35, 42);
  ctx.fillText("High Score: "+ game.highScore, 35, 58);
  requestAnimationFrame(main);

  for (i= 0; i<enemies.length; i++){
    var enemy = enemies[i];
    if (collision(hero,enemy)) {
      if (game.score > game.highScore) {
        game.highScore = game.score;
      }
      resetGame();
      return;
    }
  }
}
main();
