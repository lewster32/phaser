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

Phaser.Point3.prototype = {
    /**
    * Sets the x, y and z values of this Point3 object to the given values.
    * If you omit the y and z value then the x value will be applied to all three, for example:
    * `Point3.set(2)` is the same as `Point3.set(2, 2, 2)`
    * If however you set both x and y, but no z, the z value will be set to 0.
    * 
    * @method Phaser.Point3#set
    * @param {number} x - The x value of this point.
    * @param {number} [y] - The y value of this point. If not given the x value will be used in its place.
    * @param {number} [z] - The z value of this point. If not given and the y value is also not given, the x value will be used in its place.
    * @return {Phaser.Point3} This Point3 object. Useful for chaining method calls.
    */
    set: function (x, y, z) {
        this.x = x || 0;
        this.y = y || ((y !== 0) ? this.x : 0);
        this.z = z || ((typeof y === "undefined") ? this.x : 0);

        return this;
    },

    /**
    * Sets the x, y and z values of this Point3 object to the given values.
    * If you omit the y and z value then the x value will be applied to all three, for example:
    * `Point3.setTo(2)` is the same as `Point3.setTo(2, 2, 2)`
    * If however you set both x and y, but no z, the z value will be set to 0.
    * 
    * @method Phaser.Point3#setTo
    * @param {number} x - The x value of this point.
    * @param {number} [y] - The y value of this point. If not given the x value will be used in its place.
    * @param {number} [z] - The z value of this point. If not given and the y value is also not given, the x value will be used in its place.
    * @return {Phaser.Point3} This Point3 object. Useful for chaining method calls.
    */
    setTo: function (x, y, z) {
        return this.set(x, y, z);
    }
};