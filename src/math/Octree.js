/**
* @author       Lewis Lane <lew@rotaes.org>
* @copyright    2014 Rotates.org
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Javascript QuadTree
* @version 1.0
* @author Timo Hausmann
*
* @version 1.0, July 27th 2014
* @author Richard Davey
* The original code was a conversion of the Java code posted to GameDevTuts. However I've tweaked
* it massively to add node indexing, removed lots of temp. var creation and significantly
* increased performance as a result.
*
* Original version at https://github.com/timohausmann/quadtree-js/
*/

/**
* @copyright © 2012 Timo Hausmann
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* Octree Constructor
*
* @class Phaser.Octree 
* @classdesc A Octree implementation. The original code was a conversion of the Java code posted to GameDevTuts.
* However I've tweaked it massively to add node indexing, removed lots of temp. var creation and significantly increased performance as a result.
* Original version at https://github.com/timohausmann/quadtree-js/
* @constructor
* @param {number} x - The bottom-back coordinate of the octree.
* @param {number} y - The bottom-back coordinate of the octree.
* @param {number} z - The bottom-back coordinate of the octree.
* @param {number} widthX - The width X (breadth) of the octree.
* @param {number} widthY - The width Y (depth) of the octree.
* @param {number} height - The height (Z) of the octree.
* @param {number} [maxObjects=10] - The maximum number of objects per node.
* @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
* @param {number} [level=0] - Which level is this?
*/
Phaser.Octree = function(x, y, z, widthX, widthY, height, maxObjects, maxLevels, level) {

    /**
    * @property {number} maxObjects - The maximum number of objects per node.
    * @default
    */
    this.maxObjects = 10;

    /**
    * @property {number} maxLevels - The maximum number of levels to break down to.
    * @default
    */
    this.maxLevels = 4;

    /**
    * @property {number} level - The current level.
    */
    this.level = 0;

    /**
    * @property {object} bounds - Object that contains the octree bounds.
    */
    this.bounds = {};

    /**
    * @property {array} objects - Array of octree children.
    */
    this.objects = [];

    /**
    * @property {array} nodes - Array of associated child nodes.
    */
    this.nodes = [];

    /**
    * @property {array} _empty - Internal empty array.
    * @private
    */
    this._empty = [];

    this.reset(x, y, z, widthX, widthY, height, maxObjects, maxLevels, level);

};

Phaser.Octree.prototype = {

    /**
    * Resets the QuadTree.
    *
    * @method Phaser.Octree#reset
    * @param {number} x - The bottom-back coordinate of the octree.
    * @param {number} y - The bottom-back coordinate of the octree.
    * @param {number} z - The bottom-back coordinate of the octree.
    * @param {number} widthX - The width X (breadth) of the octree.
    * @param {number} widthY - The width Y (depth) of the octree.
    * @param {number} height - The height (Z) of the octree.
    * @param {number} [maxObjects=10] - The maximum number of objects per node.
    * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
    * @param {number} [level=0] - Which level is this?
    */
    reset: function (x, y, z, widthX, widthY, height, maxObjects, maxLevels, level) {

        this.maxObjects = maxObjects || 10;
        this.maxLevels = maxLevels || 4;
        this.level = level || 0;

        this.bounds = {
            x: Math.round(x),
            y: Math.round(y),
            z: Math.round(z),
            widthX: widthX,
            widthY: widthY,
            height: height,
            subWidthX: Math.floor(widthX * 0.5),
            subWidthY: Math.floor(widthY * 0.5),
            subHeight: Math.floor(height * 0.5),
            frontX: Math.round(x) + Math.floor(widthX * 0.5),
            frontY: Math.round(y) + Math.floor(widthY * 0.5),
            top: Math.round(z) + Math.floor(height * 0.5)
        };

        this.objects.length = 0;
        this.nodes.length = 0;

    },

    /**
    * Populates this octree with the children of the given Group. In order to be added the child must exist and have a body property.
    *
    * @method Phaser.Octree#populate
    * @param {Phaser.Group} group - The Group to add to the octree.
    */
    populate: function (group) {

        group.forEach(this.populateHandler, this, true);

    },

    /**
    * Handler for the populate method.
    *
    * @method Phaser.Octree#populateHandler
    * @param {Phaser.IsoSprite|object} sprite - The Sprite to check.
    */
    populateHandler: function (sprite) {

        if (sprite.body && sprite.exists)
        {
            this.insert(sprite.body);
        }

    },

    /**
    * Split the node into 8 subnodes
    *
    * @method Phaser.Octree#split
    */
    split: function () {

        //  bottom four octants
        //  -x-y-z
        this.nodes[0] = new Phaser.Octree(this.bounds.x, this.bounds.y, this.bounds.z, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  +x-y-z
        this.nodes[1] = new Phaser.Octree(this.bounds.frontX, this.bounds.y, this.bounds.z, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  -x+y-z
        this.nodes[2] = new Phaser.Octree(this.bounds.x, this.bounds.frontY, this.bounds.z, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  +x+y-z
        this.nodes[3] = new Phaser.Octree(this.bounds.frontX, this.bounds.frontY, this.bounds.z, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));

        //  top four octants
        //  -x-y+z
        this.nodes[4] = new Phaser.Octree(this.bounds.x, this.bounds.y, this.bounds.top, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  +x-y+z
        this.nodes[5] = new Phaser.Octree(this.bounds.frontX, this.bounds.y, this.bounds.top, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  -x+y+z
        this.nodes[6] = new Phaser.Octree(this.bounds.x, this.bounds.frontY, this.bounds.top, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
        //  +x+y+z
        this.nodes[7] = new Phaser.Octree(this.bounds.frontX, this.bounds.frontY, this.bounds.top, this.bounds.subWidthX, this.bounds.subWidthY, this.bounds.subHeight, this.maxLevels, (this.level + 1));
    },

    /**
    * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
    *
    * @method Phaser.Octree#insert
    * @param {Phaser.Physics.IsoArcade.Body|Phaser.Cube|object} body - The Body object to insert into the octree. Can be any object so long as it exposes x, y, z, frontX, frontY and top properties.
    */
    insert: function (body) {

        var i = 0;
        var index;

        //  if we have subnodes ...
        if (this.nodes[0] !== null)
        {
            index = this.getIndex(body);

            if (index !== -1)
            {
                this.nodes[index].insert(body);
                return;
            }
        }

        this.objects.push(body);

        if (this.objects.length > this.maxObjects && this.level < this.maxLevels)
        {
            //  Split if we don't already have subnodes
            if (this.nodes[0] === null)
            {
                this.split();
            }

            //  Add objects to subnodes
            while (i < this.objects.length)
            {
                index = this.getIndex(this.objects[i]);

                if (index !== -1)
                {
                    //  this is expensive - see what we can do about it
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                }
                else
                {
                    i++;
                }
            }
        }

    },

    /**
    * Determine which node the object belongs to.
    *
    * @method Phaser.Octree#getIndex
    * @param {Phaser.Cube|object} cube - The bounds in which to check.
    * @return {number} index - Index of the subnode (0-7), or -1 if cube cannot completely fit within a subnode and is part of the parent node.
    */
    getIndex: function (cube) {

        //  default is that cube doesn't fit, i.e. it straddles the internal octants
        var index = -1;

        if (cube.x < this.bounds.frontX && cube.frontX < this.bounds.frontX) {
            if (cube.y < this.bounds.frontY && cube.frontY < this.bounds.frontY) {
                if (cube.z < this.bounds.top && cube.top < this.bounds.top) {
                    //  cube fits into -x-y-z octant
                    index = 0;
                }
                else if (cube.z > this.bounds.top) {
                    //  cube fits into -x-y+z octant
                    index = 4;
                }
            }
            else if (cube.y > this.bounds.frontY) {
                if (cube.z < this.bounds.top && cube.top < this.bounds.top) {
                    //  cube fits into -x+y-z octant
                    index = 2;
                }
                else if (cube.z > this.bounds.top) {
                    //  cube fits into -x+y+z octant
                    index = 6;
                }
            }
        }
        else if (cube.x > this.bounds.frontX) {
            if (cube.y < this.bounds.frontY && cube.frontY < this.bounds.frontY) {
                if (cube.z < this.bounds.top && cube.top < this.bounds.top) {
                    //  cube fits into +x-y-z octant
                    index = 1;
                }
                else if (cube.z > this.bounds.top) {
                    //  cube fits into +x-y+z octant
                    index = 5;
                }
            }
            else if (cube.y > this.bounds.frontY) {
                if (cube.z < this.bounds.top && cube.top < this.bounds.top) {
                    //  cube fits into +x+y-z octant
                    index = 3;
                }
                else if (cube.z > this.bounds.top) {
                    //  cube fits into +x+y+z octant
                    index = 7;
                }
            }
        }


        return index;

    },

    /**
    * Return all objects that could collide with the given IsoSprite or Cube.
    *
    * @method Phaser.Octree#retrieve
    * @param {Phaser.IsoSprite|Phaser.Cube} source - The source object to check the Octree against. Either a IsoSprite or Cube.
    * @return {array} - Array with all detected objects.
    */
    retrieve: function (source) {

        var returnObjects, index;

        if (source instanceof Phaser.Cube)
        {
            returnObjects = this.objects;

            index = this.getIndex(source);
        }
        else
        {
            if (!source.body)
            {
                return this._empty;
            }

            returnObjects = this.objects;

            index = this.getIndex(source.body);
        }

        if (this.nodes[0])
        {
            //  If cube fits into a subnode ..
            if (index !== -1)
            {
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(source));
            }
            else
            {
                //  If cube does not fit into a subnode, check it against all subnodes (unrolled for speed)
                returnObjects = returnObjects.concat(this.nodes[0].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[1].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[2].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[3].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[4].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[5].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[6].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[7].retrieve(source));
            }
        }

        return returnObjects;

    },

    /**
    * Clear the octree.
    * @method Phaser.Octree#clear
    */
    clear: function () {

        this.objects.length = 0;

        var i = this.nodes.length;

        while (i--)
        {
            this.nodes[i].clear();
            this.nodes.splice(i, 1);
        }

        this.nodes.length = 0;
    }

};

Phaser.Octree.prototype.constructor = Phaser.Octree;
