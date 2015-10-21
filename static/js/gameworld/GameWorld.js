function GameWorld(tiles, collisions){

    /*
    A level is composed of n * m blocks.
    each block is composed of 4 * 4 tiles
    this blocks contain a pointer to the array index that the tiles are in.
    each tile is a pointer to the image number of the tile

    data {
    blocks : see above
    tiles : see above
    collisions : all the tiles a player can walk on
    headers : contains all the meta data for a level
    tile_images : a byte array tile images

  }

  */
  this.collisions = collisions;
  this.tiles = tiles;

  /*
   * Convert everything to 3D
   */
 // var mapparser = new MapParser();
 // this.heights = mapparser.computeHeights(this.tiles);


  this.width = this.tiles[0].length;
  this.height = this.tiles.length;
  this.light = 0.6;
}

GameWorld.prototype = {
  // returns true if a tile is solid
  isBlocking : function(tileNumber){
    for (var i = 0 ; i < this.collisions.length; i++){
      if(this.collisions[i] === tileNumber){
        return false;
      }
    }
    return true;
  },

  getBuildings : function(){
    return this.heights.finalBuildings;
  },

  /**
  * returns an array of objects representing a 3d cube in the game
  * @object{ 
  *   x 
  *   y 
  *   height 
  *   tileImage 
  *   }
  *
  */
  getMapData : function(){
    var buildings = this.getBuildings();
    var array = [];
    
    // collect up all the coordinates of the buildings
    for(var b = 0 ; b < buildings.length; b++){
      array = array.concat.apply(array, buildings[b].frontWall);
      array = array.concat.apply(array, buildings[b].roof);
      array = array.concat(buildings[b].walls);
    }

    return array;
  },

  getHeight : function(tilenumber){
    var mapping = {
      17 : 1
    };

    var height = mapping[tilenumber];
    if (height != null) {
      return height;
    } else {
      return 0;
    }
  }

};
