function Water (argument) {
	// body...
	this.tiles = [20];
	this.startTiles = [20];
	this.endTiles = [20];

	this.sections = [];
}

Water.prototype = {
	// body...
	match : function(currentTile, currentIndex){
		return this.startTiles.indexOf(currentTile) > -1;
	},
	isEnd : function(currentTile, nextTile){
		return this.tiles.indexOf(nextTile) === -1
		 // && this.endTiles.indexOf(nextTile) === -1;
	},

	getTokens : function(){
		return this.sections;
	},

	add : function(row){
		var len = this.sections.length;
		if(len===0){
			var newSection = new Section("water");
			newSection.add(row);

			this.sections.push(newSection);
		} else {
			var sectionToAddTo;
			for(var i = 0; i < len; i++){

				var section = this.sections[i];

				if(section.canAdd(row)) {
					section.add(row);
					return;
				}
			}
			// haven't found one to add to
			var newSection = new Section("water");

			newSection.add(row);

			this.sections.push(newSection);
		}
	}
};

/*
* Row = [{x : 0, y :0, height : 1, texture : 1},{},{}]
* 
*/


function WaterParser(){
	this.parse = function(sections){
		var array = [];
		if(sections.length > 0){
			for(var i = 0; i < sections.length; i++){
				var rows = sections[i].rows;
				// iterate top down through all the rows
				for(var y = 0; y < rows.length; y++){
					var row = rows[y];
					var rowdata = row.data;
					var rowArray = [];
					array.push(rowArray);
					// iterate from left to right
					for(var x = 0 ; x < rowdata.length; x++){
						var waterX = rows[y].x + x;
						var waterZ = rows[y].y;
						// debugger;
						rowArray.push({
							x : waterX,
							y : waterZ,
							height : 1,
							texture : 20
						});
					}
				}
			}	
		}
		return array;
	}
}