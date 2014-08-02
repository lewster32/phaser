/**
 * Phaser Cube constructor
 * @class Phaser.Cube
 * @constructor
 * @param {number} x - The x coordinate of the bottom-back corner of the Cube.
 * @param {number} y - The y coordinate of the bottom-back corner of the Cube.
 * @param {number} z - The z coordinate of the bottom-back corner of the Cube.
 * @param {number} widthX - The X axis width (breadth) of the Cube. This value should never be set to a negative.
 * @param {number} widthY - The Y axis width (depth) of the Cube. This value should never be set to a negative.
 * @param {number} height - The Z axis height of the Cube. This value should never be set to a negative.
 * @return {Phaser.Cube} This Cube object.
 */
Phaser.Cube = function (x, y, z, widthX, widthY, height) {

    x = x || 0;
    y = y || 0;
    z = z || 0;
    widthX = widthX || 0;
    widthY = widthY || 0;
    height = height || 0;

    /**
    * @property {number} x - The x coordinate of the bottom-back corner of the Cube.
    */
    this.x = x;

    /**
    * @property {number} y - The y coordinate of the bottom-back corner of the Cube.
    */
    this.y = y;

    /**
    * @property {number} z - The z coordinate of the bottom-back corner of the Cube.
    */
    this.z = z;

    /**
    * @property {number} widthX - The X axis width (breadth) of the Cube. This value should never be set to a negative.
    */
    this.widthX = widthX;

    /**
    * @property {number} widthY - The Y axis width (depth) of the Cube. This value should never be set to a negative.
    */
    this.widthY = widthY;

    /**
    * @property {number} height - The Z axis height of the Cube. This value should never be set to a negative.
    */
    this.height = height;

    /**
     * @property {Point3[]} _corners - The 8 corners of the Cube.
     * @private
     */
    this._corners = [new Phaser.Point3(this.x, this.y, this.z),
        new Phaser.Point3(this.x, this.y, this.z + this.height),
        new Phaser.Point3(this.x, this.y + this.widthY, this.z),
        new Phaser.Point3(this.x, this.y + this.widthY, this.z + this.height),
        new Phaser.Point3(this.x + this.widthX, this.y, this.z),
        new Phaser.Point3(this.x + this.widthX, this.y, this.z + this.height),
        new Phaser.Point3(this.x + this.widthX, this.y + this.widthY, this.z),
        new Phaser.Point3(this.x + this.widthX, this.y + this.widthY, this.z + this.height)
    ];
};

Phaser.Cube.prototype.constructor = Phaser.Cube;

Phaser.Cube.prototype = {
    /**
    * Sets the members of Cube to the specified values.
    * @method Phaser.Cube#setTo
    * @param {number} x - The x coordinate of the bottom-back corner of the Cube.
    * @param {number} y - The y coordinate of the bottom-back corner of the Cube.
    * @param {number} z - The z coordinate of the bottom-back corner of the Cube.
    * @param {number} widthX - The X axis width (breadth) of the Cube. This value should never be set to a negative.
    * @param {number} widthY - The Y axis width (depth) of the Cube. This value should never be set to a negative.
    * @param {number} height - The Z axis height of the Cube. This value should never be set to a negative.
    * @return {Phaser.Cube} This Cube object
    */
    setTo: function (x, y, z, widthX, widthY, height) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.widthX = widthX;
        this.widthY = widthY;
        this.height = height;

        return this;

    },
    copyFrom: function (source) {
        this.setTo(source.x, source.y, source.z, source.widthX, source.widthY, source.height);
    },
    copyTo: function (dest) {
        dest.x = this.x;
        dest.y = this.y;
        dest.z = this.z;
        dest.widthX = this.widthX;
        dest.widthY = this.widthY;
        dest.height = this.height;

        return dest;
    },
    size: function (output) {
        return Phaser.Cube.size(this, output);
    },
    clone: function (output) {
        return Phaser.Cube.clone(this, output);
    },
    intersects: function (b) {
        return Phaser.Cube.intersects(this, b);
    },
    getCorners: function () {
        this._corners[0].setTo(this.x, this.y, this.z);
        this._corners[1].setTo(this.x, this.y, this.z + this.height);
        this._corners[2].setTo(this.x, this.y + this.widthY, this.z);
        this._corners[3].setTo(this.x, this.y + this.widthY, this.z + this.height);
        this._corners[4].setTo(this.x + this.widthX, this.y, this.z);
        this._corners[5].setTo(this.x + this.widthX, this.y, this.z + this.height);
        this._corners[6].setTo(this.x + this.widthX, this.y + this.widthY, this.z);
        this._corners[7].setTo(this.x + this.widthX, this.y + this.widthY, this.z + this.height);

        return this._corners;
    }
};

Phaser.Cube.size = function (a, output) {
    if (typeof output === "undefined" || output === null) {
        output = new Phaser.Point3(a.widthX, a.widthY, a.height);
    }
    else {
        output.setTo(a.widthX, a.widthY, a.height);
    }

    return output;
};

Phaser.Cube.clone = function (a, output) {
    if (typeof output === "undefined" || output === null) {
        output = new Phaser.Cube(a.x, a.y, a.z, a.widthX, a.widthY, a.height);
    }
    else {
        output.setTo(a.x, a.y, a.z, a.widthX, a.widthY, a.height);
    }

    return output;
};

Phaser.Cube.contains = function (a, x, y, z) {
    if (a.widthX <= 0 || a.widthY <= 0 || a.height <= 0) {
        return false;
    }

    return (x >= a.x && x <= a.right && y >= a.y && y <= a.back && z >= a.z && z <= a.top);
};

Phaser.Cube.containsPoint3 = function (a, point3) {
    return Phaser.Cube.contains(a, point3.x, point3.y, point3.z);
};

Phaser.Cube.intersects = function (a, b) {
    if (a.widthX <= 0 || a.widthY <= 0 || a.height <= 0 || b.widthX <= 0 || b.widthY <= 0 || b.height <= 0) {
        return false;
    }
    return !(a.frontX < b.x || a.frontY < b.y || a.x > b.frontX || a.y > b.frontY || a.z > b.top || a.top < b.z);
};

Object.defineProperty(Phaser.Cube.prototype, "halfWidthX", {

    get: function () {
        return Math.round(this.widthX * 0.5);
    }

});

Object.defineProperty(Phaser.Cube.prototype, "halfWidthY", {

    get: function () {
        return Math.round(this.widthY * 0.5);
    }

});

Object.defineProperty(Phaser.Cube.prototype, "halfHeight", {

    get: function () {
        return Math.round(this.height * 0.5);
    }

});

Object.defineProperty(Phaser.Cube.prototype, "centerX", {
    get: function () {
        return this.x + this.halfWidthX;
    },

    set: function (value) {
        this.x = value - this.halfWidthX;
    }
});

Object.defineProperty(Phaser.Cube.prototype, "centerY", {
    get: function () {
        return this.y + this.halfWidthY;
    },

    set: function (value) {
        this.y = value - this.halfWidthY;
    }
});

Object.defineProperty(Phaser.Cube.prototype, "centerZ", {
    get: function () {
        return this.z + this.halfHeight;
    },

    set: function (value) {
        this.z = value - this.halfHeight;
    }
});


Object.defineProperty(Phaser.Cube.prototype, "bottom", {

    get: function () {
        return this.z;
    },

    set: function (value) {
        if (value >= this.top) {
            this.height = 0;
        } else {
            this.height = (this.top - value);
        }
        this.z = value;
    }

});

Object.defineProperty(Phaser.Cube.prototype, "top", {

    get: function () {
        return this.z + this.height;
    },

    set: function (value) {
        if (value <= this.z) {
            this.height = 0;
        } else {
            this.height = (value - this.z);
        }
    }

});

Object.defineProperty(Phaser.Cube.prototype, "backX", {

    get: function () {
        return this.x;
    },

    set: function (value) {
        if (value >= this.frontX) {
            this.widthX = 0;
        } else {
            this.widthX = (this.frontX - value);
        }
        this.x = value;
    }

});

Object.defineProperty(Phaser.Cube.prototype, "backY", {

    get: function () {
        return this.y;
    },

    set: function (value) {
        if (value >= this.frontY) {
            this.widthY = 0;
        } else {
            this.widthY = (this.frontY - value);
        }
        this.y = value;
    }

});

Object.defineProperty(Phaser.Cube.prototype, "frontX", {

    get: function () {
        return this.x + this.widthX;
    },

    set: function (value) {
        if (value <= this.x) {
            this.widthX = 0;
        } else {
            this.widthX = (value - this.x);
        }
    }

});

Object.defineProperty(Phaser.Cube.prototype, "frontY", {

    get: function () {
        return this.y + this.widthY;
    },

    set: function (value) {
        if (value <= this.y) {
            this.widthY = 0;
        } else {
            this.widthY = (value - this.y);
        }
    }

});

Object.defineProperty(Phaser.Cube.prototype, "volume", {

    get: function () {
        return this.widthX * this.widthY * this.height;
    }

});