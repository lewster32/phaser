/**
 * Phaser IsoSprite constructor
 * @class Phaser.IsoSprite
 * @constructor
 */

Phaser.IsoSprite = function (game, x, y, z, key, frame, parent) {

    Phaser.Sprite.call(this, game, x, y, key, frame, parent);

    this._isoPosition = new Phaser.Point3(x, y, z);

    this._toIso();

    this.type = Phaser.ISOSPRITE;

    this.snap = 0.3;
};

Phaser.IsoSprite.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.IsoSprite.prototype.constructor = Phaser.IsoSprite;

Phaser.IsoSprite.prototype.preUpdate = function () {

    if (this._cache[4] === 1 && this.exists) {
        this.world.setTo(this.parent.position.x + this.position.x, this.parent.position.y + this.position.y);
        this.worldTransform.tx = this.world.x;
        this.worldTransform.ty = this.world.y;
        this._cache[0] = this.world.x;
        this._cache[1] = this.world.y;
        this._cache[2] = this.rotation;

        if (this.body) {
            this.body.preUpdate();
        }

        this._cache[4] = 0;

        return false;
    }

    this._cache[0] = this.world.x;
    this._cache[1] = this.world.y;
    this._cache[2] = this.rotation;

    if (!this.exists || !this.parent.exists) {
        //  Reset the renderOrderID
        this._cache[3] = -1;
        return false;
    }

    if (this.lifespan > 0) {
        this.lifespan -= this.game.time.elapsed;

        if (this.lifespan <= 0) {
            this.kill();
            return false;
        }
    }

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds) {
        this._bounds.copyFrom(this.getBounds());
    }

    if (this.autoCull) {
        //  Won't get rendered but will still get its transform updated
        this.renderable = this.game.world.camera.screenView.intersects(this._bounds);
    }

    if (this.checkWorldBounds) {
        //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
        if (this._cache[5] === 1 && this.game.world.bounds.intersects(this._bounds)) {
            this._cache[5] = 0;
            this.events.onEnterBounds.dispatch(this);
        }
        else if (this._cache[5] === 0 && !this.game.world.bounds.intersects(this._bounds)) {
            //  The Sprite WAS in the screen, but has now left.
            this._cache[5] = 1;
            this.events.onOutOfBounds.dispatch(this);

            if (this.outOfBoundsKill) {
                this.kill();
                return false;
            }
        }
    }

    this.world.setTo(this.game.camera.x + this.worldTransform.tx, this.game.camera.y + this.worldTransform.ty);

    if (this.visible) {
        this._cache[3] = this.game.stage.currentRenderOrderID++;
    }

    this.animations.update();

    if (this.body) {
        this.body.preUpdate();
    }

    //  Update any Children
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children[i].preUpdate();
    }

    return true;

};

Phaser.IsoSprite.prototype.postUpdate = function () {
    if (this.key instanceof Phaser.BitmapData) {
        this.key.render();
    }

    if (this.exists && this.body) {
        this.body.postUpdate();
    }

    //  Fixed to Camera?
    if (this._cache[7] === 1) {
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    }

    //  Update any Children
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children[i].postUpdate();
    }

    this._toIso();
};

Phaser.IsoSprite.prototype._toIso = function () {
    Phaser.IsoSprite.isoToOrtho(this._isoPosition, this.position);

    if (this.snap) {
        this.position.x = Phaser.Math.snapTo(this.position.x, this.snap);
        this.position.y = Phaser.Math.snapTo(this.position.y, this.snap);
    }
};

Phaser.IsoSprite.isoToOrtho = function (point3, out) {
    if (typeof out === "undefined") { out = new Phaser.Point(); }

    out.x = point3.x - point3.y;
    out.y = ((point3.x + point3.y) * 0.5) - point3.z;

    return out;
}

Object.defineProperty(Phaser.IsoSprite.prototype, "ix", {
    get: function () {
        return this._isoPosition.x;
    },
    set: function (value) {
        this._isoPosition.x = value;
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "iy", {
    get: function () {
        return this._isoPosition.y;
    },
    set: function (value) {
        this._isoPosition.y = value;
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "iz", {
    get: function () {
        return this._isoPosition.z;
    },
    set: function (value) {
        this._isoPosition.z = value;
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "depth", {
    get: function () {
        return (this._isoPosition.x + this._isoPosition.y) + this._isoPosition.z;
    }
});