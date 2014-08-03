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
    * Copies the x, y and z properties from any given object to this Point3.
    *
    * @method Phaser.Point3#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Phaser.Point3} This Point3 object.
    */
    copyFrom: function (source) {

        return this.setTo(source.x, source.y, source.z);

    },

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
    },

    /**
    * Adds the given x, y and z values to this Point3.
    *
    * @method Phaser.Point3#add
    * @param {number} x - The value to add to Point3.x.
    * @param {number} y - The value to add to Point3.y.
    * @param {number} z - The value to add to Point3.z.
    * @return {Phaser.Point3} This Point3 object. Useful for chaining method calls.
    */
    add: function (x, y) {

        this.x += x || 0;
        this.y += y || 0;
        return this;

    },

    /**
    * Subtracts the given x, y and z values from this Point3.
    *
    * @method Phaser.Point3#subtract
    * @param {number} x - The value to subtract from Point3.x.
    * @param {number} y - The value to subtract from Point3.y.
    * @param {number} z - The value to subtract from Point3.z.
    * @return {Phaser.Point3} This Point3 object. Useful for chaining method calls.
    */
    subtract: function (x, y, z) {

        this.x -= x || 0;
        this.y -= y || 0;
        this.z -= z || 0;

        return this;

    },

    /**
    * Multiplies Point3.x, Point3.y and Point3.z by the given x and y values. Sometimes known as `Scale`.
    *
    * @method Phaser.Point3#multiply
    * @param {number} x - The value to multiply Point3.x by.
    * @param {number} y - The value to multiply Point3.y by.
    * @param {number} z - The value to multiply Point3.z by.
    * @return {Phaser.Point3} This Point object. Useful for chaining method calls.
    */
    multiply: function (x, y, z) {

        this.x *= x || 1;
        this.y *= y || 1;
        this.z *= z || 1;

        return this;

    },

    /**
    * Divides Point3.x, Point3.y and Point3.z by the given x, y and z values.
    *
    * @method Phaser.Point3#divide
    * @param {number} x - The value to divide Point3.x by.
    * @param {number} y - The value to divide Point3.y by.
    * @param {number} z - The value to divide Point3.z by.
    * @return {Phaser.Point3} This Point3 object. Useful for chaining method calls.
    */
    divide: function (x, y, z) {

        this.x /= x || 1;
        this.y /= y || 1;
        this.z /= z || 1;

        return this;

    },
};