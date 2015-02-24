var COL_WIDTH = 101;
var ROW_HEIGHT = 83;
var ENEMIES = 3;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startPos();
}

Enemy.prototype.startPos = function() {
    this.x = COL_WIDTH * Math.floor(Math.random()* -4 + 1);
    this.y = ROW_HEIGHT * Math.floor(Math.random()* 3 + 1);
    this.speed = Math.random() * 400 + 150;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x > 505) {
        this.startPos();
    }
    if (this.y === player.y && Math.abs(this.x - player.x) < 40) {
        player.collision();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.startPos();
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(dt) {

};
Player.prototype.startPos = function() {
    this.x = 202;
    this.y = 415;
};
Player.prototype.collision = function() {
    this.startPos();
};
Player.prototype.handleInput = function(dir) {
    if (dir == "up" && this.y > ROW_HEIGHT ) {
        this.y -= ROW_HEIGHT;
    }
    if (dir == "down" && this.y < 415 ) {
        this.y += ROW_HEIGHT;
    }
    if (dir == "left" && this.x >= COL_WIDTH ) {
        this.x -= COL_WIDTH;
    }
    if (dir == "right" && this.x < 404 ) {
        this.x += COL_WIDTH;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 1; i <= ENEMIES; i++ ) {
    allEnemies.push(new Enemy());
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
