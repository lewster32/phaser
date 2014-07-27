/**
 * Phaser IsoSprite constructor
 * @class Phaser.IsoSprite
 * @constructor
 */

Phaser.IsoSprite = function (game, x, y, z, key, frame, parent) {

    Phaser.Image.call(this, game, x, y, key, frame, parent);

    this._isoPosition = new Phaser.Point3(x, y, z);

    this._toIso();

    this.snap = 0.3;

    this.body = new Phaser.Cube(this._isoPosition.x, this._isoPosition.y, this._isoPosition.z - this.height * 0.1, this.width * 0.5, this.width * 0.5, (this.height * 0.66));
};

Phaser.IsoSprite.prototype = Object.create(Phaser.Image.prototype);
Phaser.IsoSprite.prototype.constructor = Phaser.IsoSprite;

Phaser.IsoSprite.prototype._toIso = function () {
    Phaser.IsoSprite.isoToOrtho(this._isoPosition, this.position);

    if (this.body) {
        this.body.x = this._isoPosition.x;
        this.body.y = this._isoPosition.y;
        this.body.z = this._isoPosition.z - this.height * 0.1;
    }

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
        this._toIso();
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "iy", {
    get: function () {
        return this._isoPosition.y;
    },
    set: function (value) {
        this._isoPosition.y = value;
        this._toIso();
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "iz", {
    get: function () {
        return this._isoPosition.z;
    },
    set: function (value) {
        this._isoPosition.z = value;
        this._toIso();
    }
});

Object.defineProperty(Phaser.IsoSprite.prototype, "depth", {
    get: function () {
        return (this._isoPosition.x + this._isoPosition.y) + this._isoPosition.z;
    }
});