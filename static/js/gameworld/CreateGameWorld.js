var CreateGameWorld = {
	create2d : function(data){
		
		 // why didn't i put comments in i can't remember what the hell this is doing.
	    
	    var tiles = this.createTiles(data);

	    var gameWorld = new GameWorld(tiles, data.collisions)
	   	
	    var mapparser = new MapParser();
 		gameWorld.heights = mapparser.computeHeights(gameWorld.tiles);

 		return gameWorld;
	},


	createTiles : function(data){
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
	},

	create3d : function(){


	}
}