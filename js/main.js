
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        
        game.load.image( 'background', 'assets/background.png' );
		game.load.image( 'ship', 'assets/ship.png' );
		game.load.image( 'virus', 'assets/virus.png' );
    }
    
    var player;
	var enemies;
	var NumberofEnemies = 10;
	var cursors;
	var enemy1;
	var enemy3;
	var enemy2;
	var enemy4;
	var enemy5;
	var currentSpeed = 0;
	var background;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        player = game.add.sprite( game.world.centerX, game.world.centerY, 'ship' );
		background = game.add.tileSprite(0,0,800,600,'background');
		land.fixedToCamera = true;
        player.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        enemy1 = game.add.sprite(game.world.randomX,game.world.randomY,'virus');
		game.physics.enable(enemy1, Phaser.Physics.ARCADE);
		
		enemy2 = game.add.sprite(game.world.randomX,game.world.randomY,'virus');
		game.physics.enable(enemy2, Phaser.Physics.ARCADE);
		
		enemy3 = game.add.sprite(game.world.randomX,game.world.randomY,'virus');
		game.physics.enable(enemy3, Phaser.Physics.ARCADE);
		
		enemy4 = game.add.sprite(game.world.randomX,game.world.randomY,'virus');
		game.physics.enable(enemy4, Phaser.Physics.ARCADE);
		
		enemy5 = game.add.sprite(game.world.randomX,game.world.randomY,'virus');
		game.physics.enable(enemy5, Phaser.Physics.ARCADE);
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
		if(currentSpeed > 0)
		{
			game.physics.arcade.velocityFromRotation(player.rotation,currentSpeed,player.velocity);
		}
		background.tilePosition.x = -game.camera.x;
		land.tilePosition.y = -game.camera.y;
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
	function playerHitEnemy(player, Enemy){
		enemies[Enemy.name].kill();
	}

