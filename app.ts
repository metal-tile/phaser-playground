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

    preload() {
        this.game.load.tilemap('desert', 'assets/tilemaps/maps/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
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

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
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
            this.game.camera.x -= 4;
        }
        else if (this.cursors.right.isDown)
        {
            this.game.camera.x += 4;
        }

        if (this.cursors.up.isDown)
        {
            this.game.camera.y -= 4;
        }
        else if (this.cursors.down.isDown)
        {
            this.game.camera.y += 4;
        }
    }

    render() {
        this.game.debug.text('Left-click to paint. Shift + Left-click to select tile. Arrows to scroll.', 32, 32, '#efefef');
    }

}

window.onload = () => {
    const game = new SimpleGame();
};