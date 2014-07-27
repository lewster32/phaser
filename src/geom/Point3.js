/**
 * Phaser Point3 constructor
 * @class Phaser.Point3
 * @constructor
 */
Phaser.Point3 = function (x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;


    /**
    * @property {number} x - The x value of the point.
    */
    this.x = x;

    /**
    * @property {number} y - The y value of the point.
    */
    this.y = y;

    /**
    * @property {number} z - The z value of the point.
    */
    this.z = z;
};