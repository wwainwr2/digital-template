var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    
    game.load.image('star', 'assets/star.png', 32, 32);
    game.load.image('player', 'assets/ship.png');
    game.load.image('starfield', 'assets/background2.png');
    game.load.image('background', 'assets/background.png');
	game.load.image('enemy','assets/enemy.png');
	game.load.image('bullet', 'assets/bullet.png');

}

var player;
var star;
var stars;

var cursors;
var fireButton;
var bullets;
var bulletTime = 0;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var enemies;
var ememy;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
	
	enemy = game.add.sprite(500,400,'enemy');
	enemy.anchor.setTo(0.5,0.5);
	game.physics.enable(enemy,Phaser.Physics.ARCADE);
	
    //  The hero!
    player = game.add.sprite(400, 500, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //  The items!
    stars = game.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;

    createStars();

    //  The score
    scoreString = 'Score: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });


    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

  

    

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
}

function createStars() {
			var x = this.game.rnd.integerInRange(0,600);
			var y = this.game.rnd.integerInRange(0,600);
            var star = stars.create(x, y, 'star');
            star.anchor.setTo(0.5, 0.5);
            star.body.moves = false;
    
}





function update() {

    //  Scroll the background
    starfield.tilePosition.y += 2;

    if (player.alive)
    {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }
		else if(cursors.up.isDown)
		{
			player.body.velocity.y = -200;
		}
		else if(cursors.down.isDown)
		{
			player.body.velocity.y = 200;
		}
 
		//enemies.rotation = game.physics.arcade.accelerateToObject(enemies,player,100,100,100);
        var x = player.x;
		var y = player.y;
		game.physics.arcade.accelerateToXY(enemy, x, y);
		if (fireButton.isDown)
        {
            fireBullet();
        }
		
        game.physics.arcade.overlap(player, stars, PlayerHitStar, null, this);
		game.physics.arcade.overlap(player, enemy, PlayerHitEnemy, null, this);
		game.physics.arcade.overlap(bullets, enemy, collisionHandler, null, this);
    }

}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}


function PlayerHitEnemy(player, enemy){
	player.kill();
}


function PlayerHitStar (player, star) {

    //  When a bullet hits an alien we kill them both
    star.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;


    if (stars.countLiving() == 0)
    {
        createStars();
    }

}
function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function collisionHandler (bullet, enemy) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    enemy.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;
}


function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

