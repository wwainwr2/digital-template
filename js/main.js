Enemy = function(index,game,player){
	var x = game.world.randomX;
	var y = gmae.world.randomY;
	this.game = game;
	this.player = player;
	this.virus =game.add.sprite(x,y,'virus');
	this.virus.anchor.set(0.5,0.5);
	game.physics.enable(this.enemy,Phaser.Pysics.ARCADE);
}
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        
        game.load.image( 'background', 'assets/background.png' );
		game.load.image( 'ship', 'assets/ship.png' );
		game.load.image( 'virus', 'assests/virus.png' );
    }
    
    var player;
	var enemies;
	var NumberofEnemies = 10;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        player = game.add.sprite( game.world.centerX, game.world.centerY, 'ship' );
 
        player.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        enemies = [];
		for(var i = 0;i<NumberofEnemies;i++)
		{
			enemies.push(new Enemy(i,game,player));
		}
		cursors = game.input.keyboard.createCursorKeys();
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something awesome.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        if(cursors.left.isDown)
		{
			player.angle -=4;
		}
		else if(cursors.right.isDown)
		{
			player.angle +=4;
		}
		if(cursors.up.isDown)
		{
			currentSpeed = 300;
		}
		else{
			if(currentSpeed > 0)
			{
				currentSpeed -= 4;
			}
		}
		background.tilePosition.x = -game.camera.x;
		land.tilePosition.y = -game.camera.y;
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
	function playerHitEnemy(player, Enemy){
		enemies[Enemy.name].kill();
	}

