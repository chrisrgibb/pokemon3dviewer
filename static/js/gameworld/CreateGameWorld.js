var CreateGameWorld = {

	sections : {
		building : null,
		bush : null,
		cliff : null
	},

	create : function(data){
		var gameworld = this.create2d();



	},


	create2d : function(data){
		
		 // why didn't i put comments in i can't remember what the hell this is doing.
	    
	    var tiles = this.createTiles(data);

	    var gameWorld = new GameWorld(tiles, data.collisions)
	   	
	    var mapparser = new MapParser();
 		gameWorld.heights = mapparser.createTokens(gameWorld.tiles);

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
		// this.computedHeights = []; // front of building

	 //    this.sections.forEach(function(section, index){
	 //      // each section represents one building from the roof(if it has one) to the bottom

	 //      var height = section.rows.length,
	 //          topleftcorner = section.rows[0].data[0];



	 //      if(height > 1 && topleftcorner===76){

	 //        // start of building = x and y - roofsize ( 4 ) which is the top left corner
	 //        // height will be height - roofsize
	 //        var roofsize = 4,
	 //            buildingHeight = height - roofsize,
	 //            buildingX = section.rows[0].x,
	 //            // for the next line roofsize can be changed to buildingheight 
	 //            buildingY = section.rows[0].y + roofsize, // start of building without the roof 
	 //            width = section.rows[0].width; // assumption that the width doesn't change

	 //        var building = {
	 //          x : buildingX,
	 //          y : buildingY,
	 //          height : buildingHeight, // height on Y axis
	 //          roof : null,
	 //          frontWall : null
	 //        };

	 //        /*
	 //        *   create roofs
	 //        */

	 //        if(topleftcorner===76){ // double check again because i might change it
	 //          building.roof = this.convertRoof(section, roofsize, buildingHeight);
	 //        }

	 //        building.frontWall = this.convertBuildingFront(section.rows, height, roofsize);

	 //        building.walls = this.createWalls(buildingX, buildingY, width, buildingY, buildingHeight); // should be front of building height?

	 //        this.computedHeights.push(building);

	 //      }
	 //    }, this);

	 //    return this.computedHeights;

	}
}