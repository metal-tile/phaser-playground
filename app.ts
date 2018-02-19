class SimpleGame {
    constructor() {
        this.game = new Phaser.Game(1280, 832, Phaser.CANVAS, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    game: Phaser.Game;
    map: any;
    layer: any;

    marker: any;
    currentTile: any;
    cursors: any;
    wKey: any;

    sprite: any;

    preload() {
        this.game.load.tilemap('desert', 'assets/tilemaps/maps/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
        this.game.load.spritesheet('zet', 'assets/character/zet.png', 32, 48);
    }

    create() {
        this.map = this.game.add.tilemap('desert');

        this.map.addTilesetImage('Desert', 'tiles');

        this.currentTile = this.map.getTile(2, 3);

        this.layer = this.map.createLayer('Ground');

        this.layer.resizeWorld();

        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);

        this.sprite = this.game.add.sprite(96, 192, 'zet');

        this.sprite.animations.add('walk', [0, 1, 2]);
        this.sprite.animations.play('walk', 6, true);
        this.sprite.scale.set(1);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite);
        this.game.camera.follow(this.sprite);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    }

    update() {
        this.game.physics.arcade.collide(this.sprite, this.layer);

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        this.marker.x = this.layer.getTileX(this.game.input.activePointer.worldX) * 32;
        this.marker.y = this.layer.getTileY(this.game.input.activePointer.worldY) * 32;

        if (this.game.input.mousePointer.isDown)
        {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
            {
                this.currentTile = this.map.getTile(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
            }
            else
            {
                if (this.map.getTile(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y)).index != this.currentTile.index)
                {
                    this.map.putTile(this.currentTile, this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
                }
            }
        }

        if (this.cursors.left.isDown)
        {
            // this.game.camera.x -= 4;

        }
        else if (this.cursors.right.isDown)
        {
            this.game.camera.x += 4;
        }

        if (this.wKey.isDown)
        {
            // this.game.camera.y -= 4;
            this.sprite.body.velocity.y = -100;
        }
        else if (this.cursors.down.isDown)
        {
            // this.game.camera.y += 4;
            this.sprite.body.velocity.y = 100;
        }
    }

    render() {
        this.game.debug.text('Left-click to paint. Shift + Left-click to select tile. Arrows to scroll.', 32, 32, '#efefef');
    }

}

window.onload = () => {
    const game = new SimpleGame();
};