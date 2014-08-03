/**
 * Phaser IsoSprite constructor
 * @class Phaser.IsoSprite
 * @constructor
 */

Phaser.IsoSprite = function (game, x, y, z, key, frame, parent) {

    Phaser.Sprite.call(this, game, x, y, key, frame, parent);

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ISOSPRITE;

    /**
    * @property {Phaser.Point3} _isoPosition - Internal 3D position.
    * @private
    */
    this._isoPosition = new Phaser.Point3(x, y, z);

    /**
    * @property {number} snap - Snap this IsoSprite's position to this value; handy for keeping pixel art snapped to whole pixels.
    * @default
    */
    this.snap = 0;

    /**
    * @property {number} _depth - Internal cached depth value.
    * @readonly
    */
    this._depth = 0;

    /**
    * @property {boolean} _depthChanged - Internal invalidation control for depth management.
    * @readonly
    */
    this._depthChanged = true;

    /**
    * @property {boolean} _isoPositionChanged - Internal invalidation control for positioning.
    * @readonly
    */
    this._isoPositionChanged = true;

    this._project();
};

Phaser.IsoSprite.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.IsoSprite.prototype.constructor = Phaser.IsoSprite;

/**
* Internal function called by the World postUpdate cycle.
*
* @method Phaser.IsoSprite#postUpdate
* @memberof Phaser.IsoSprite
*/
Phaser.IsoSprite.prototype.postUpdate = function () {
    Phaser.Sprite.prototype.postUpdate.apply(this);

    this._project();
};

/**
* Internal function that performs the axonometric projection from 3D to 2D space.
* @method Phaser.IsoSprite#_project
* @memberof Phaser.IsoSprite
* @private
*/
Phaser.IsoSprite.prototype._project = function () {
    if (this._isoPositionChanged) {
        this.game.iso.project(this._isoPosition, this.position);

        if (this.snap) {
            this.position.x = Phaser.Math.snapTo(this.position.x, this.snap);
            this.position.y = Phaser.Math.snapTo(this.position.y, this.snap);
        }

        this._isoPositionChanged = false;
    }
};

/**
* The axonometric position of the IsoSprite on the x axis. Increasing the x coordinate will move the object down and to the right on the screen.
*
* @name Phaser.Sprite#isoX
* @property {number} isoX - The axonometric position of the IsoSprite on the x axis.
*/
Object.defineProperty(Phaser.IsoSprite.prototype, "isoX", {
    get: function () {
        return this._isoPosition.x;
    },
    set: function (value) {
        this._isoPosition.x = value;
        this._depthChanged = this._isoPositionChanged = true;
    }
});

/**
* The axonometric position of the IsoSprite on the y axis. Increasing the y coordinate will move the object down and to the left on the screen.
*
* @name Phaser.Sprite#isoY
* @property {number} isoY - The axonometric position of the IsoSprite on the y axis.
*/
Object.defineProperty(Phaser.IsoSprite.prototype, "isoY", {
    get: function () {
        return this._isoPosition.y;
    },
    set: function (value) {
        this._isoPosition.y = value;
        this._depthChanged = this._isoPositionChanged = true;
    }
});

/**
* The axonometric position of the IsoSprite on the z axis. Increasing the z coordinate will move the object directly upwards on the screen.
*
* @name Phaser.Sprite#isoZ
* @property {number} isoZ - The axonometric position of the IsoSprite on the z axis.
*/
Object.defineProperty(Phaser.IsoSprite.prototype, "isoZ", {
    get: function () {
        return this._isoPosition.z;
    },
    set: function (value) {
        this._isoPosition.z = value;
        this._depthChanged = this._isoPositionChanged = true;
    }
});

/**
* A Point3 object representing the axonometric position of the IsoSprite.
*
* @name Phaser.Sprite#isoPosition
* @property {Point3} isoPosition - The axonometric position of the IsoSprite on the z axis.
* @readonly
*/
Object.defineProperty(Phaser.IsoSprite.prototype, "isoPosition", {
    get: function () {
        return this._isoPosition;
    }
});

/**
* The non-unit distance of the IsoSprite from the 'front' of the scene. Used to correctly depth sort a group of IsoSprites.
*
* @name Phaser.Sprite#depth
* @property {number} depth - A calculated value used for depth sorting.
* @readonly
*/
Object.defineProperty(Phaser.IsoSprite.prototype, "depth", {
    get: function () {
        if (this._depthChanged === true) {
            this._depth = (this._isoPosition.x + this._isoPosition.y) + (this._isoPosition.z + (this.height * this.anchor.y));
            this._depthChanged = false;
        }
        return this._depth;
    }
});