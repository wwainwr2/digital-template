var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    
    game.load.image('star', 'assets/star.png', 32, 32);
    game.load.image('player', 'assets/ship.png');
    game.load.image('starfield', 'assets/background.png');
    game.load.image('background', 'assets/background.png');

}

var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    

    

    //  The hero!
    player = game.add.sprite(400, 500, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //  The baddies!
    stars = game.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    //  The score
    scoreString = 'Score: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });


    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

  

    

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    
}

function createAliens() {
			int x = between(790, 590);
			int y = between(790, 590);
            var star = stars.create(x, y, 'star');
            star.anchor.setTo(0.5, 0.5);
            star.body.moves = false;

    
}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    aliens.y += 10;

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
			player.body.velocity.y = 200;
		}
		else if(cursors.down.isDown)
		{
			player.body.velocity.y = -200;
		}
 
        

        

        game.physics.arcade.overlap(plaeyer, star, PlayerHitStar, null, this);
    }

}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}






function PlayerHitStar (player, star) {

    //  When a bullet hits an alien we kill them both
    star.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;


    if (stars.countLiving() == 0)
    {
        createAliens();
    }

}
