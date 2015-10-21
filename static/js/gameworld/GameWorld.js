function GameWorld(data){

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
  function getTileMap(data, map){
    // why didn't i put comments in i can't remember what the hell this is doing.
    var array = [];
    var width = data.blocks[0].length * 4;
    var height = data.blocks.length * 4;
    /*
    Iterate over all the blocks and compose a 2d array of the level.

    */
    for (var y = 0; y < height; y++){
      array.push([]);
      for (var x = 0; x < width; x++) {
        // get block
        var tileblockx = Math.floor(x / 4);
        var tileblocky = Math.floor(y / 4);
        var block = data.blocks[tileblocky][tileblockx];
        // get index of imagetile
        var index = (x % 4 ) + (y * 4) % 16;
        //
        var tile = data.tiles[block][index];

        array[y][x] = tile;
      }
    }
    return array;
  }
  this.collisions = data.collisions;
  this.tiles = getTileMap(data, this);


  /*
   * Convert everything to 3D
   */
  var heights = new MapParser();
  this.heights = heights.computeHeights(this.tiles);


  this.width = this.tiles[0].length;
  this.height = this.tiles.length;
  this.light = 0.6;
}

GameWorld.prototype = {
  // returns true if a tile is solid
  isBlocking : function(tileNumber){
    for (var i = 0 ; i < this.collisions.length; i++){
      if(this.collisions[i]===tileNumber){
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
