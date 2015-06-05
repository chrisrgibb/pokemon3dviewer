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
        var tile = data.tiles[block][index];

        array[y][x] = tile; // || ggs;
      }
    }
    return array;
  }
  this.collisions = data.collisions;
  this.tiles = getTileMap(data, this);
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

  getHeight : function(tilenumber){
    var mapping = {
      17 : 1,
      15 : 1,
      78 : 1,

      26 : 1,
      27 : 1,
      28 : 1,
      74 : 1
    };

    var height = mapping[tilenumber];
    if (height != null) {
      return height;
    } else {
      return 0;
    }
  },

  getTile : function(number, color, imageNumber){
    return {
      number : number,
      color : color || undefined,
      tileImage : imageNumber
    };
  }

};
