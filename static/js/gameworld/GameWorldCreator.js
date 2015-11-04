var GameWorldCreator = {

	sections : {
		building : null,
		bush : null,
		cliff : null
	},

	create : function(data){
		var gameworld = this.create2d(data);
		
		return this.create3d(gameworld);;
	},

	create2d : function(data){
		 // why didn't i put comments in i can't remember what the hell this is doing.
	    var tiles = this.createTiles(data);

 		return new GameWorld(tiles, data.collisions)
	},

	create3d : function(gameworld){
		var mapparser = new MapTokenizer();
		var tokens = mapparser.createTokens(gameworld.tiles);

		var building = new CreateBuilding();

		gameworld.heights = {
			bushes : parseTheBush(tokens.bushSections),
			finalBuildings : building.mapHeights(tokens.buildingSections)
		};
 		return gameworld;
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

	createBuildings : function(){


	}


}