function Bush(data){
	this.startTiles = [64, 80];
	this.endTiles = [65, 81];

	this.tiles = data;	

	this.sections = [];
}


function BushSection(){
	this.rows = [];
	this.size = 0;
	this.translated = {};
	this.coords = {};
	this.type = "bush";

	this.canAdd = function(row){
		if(this.size === 0){
			// can add because it is empty currently
			return true;
		}
		var lastRow = this.rows[this.size-1];
		if(lastRow.x === row.x && lastRow.y+1 === row.y
			&& lastRow.data[1] !== 81){ // if === 81 then we have already completed this section
			return true;
		}
		return false;
	}

	this.add = function(row){
		if(this.canAdd(row)){
			this.rows.push(row);
			this.size += 1;
			return true;
		} else {
			return false;
		}
	}

}

Bush.prototype = {
	// body...

	match : function(currentTile, currentIndex){
			return this.startTiles.indexOf(currentTile) > -1;
		},

		isEnd : function(currentTile, nextTile){
			return this.endTiles.indexOf(currentTile) > -1
		 // && this.endTiles.indexOf(nextTile) === -1;
		},

		getTokens : function(){
			return this.sections;
		},

		add : function(row){
			var len = this.sections.length;
			if(len===0){
				var newSection = new BushSection();
				newSection.add(row);

				this.sections.push(newSection);
			} else {
				// check all sections to see if we can add to them
				var sectionToAddTo;
				for(var i = 0; i < len; i++){

				var section = this.sections[i];

				if(section.canAdd(row)) {
					section.add(row);
					return;
				}
			}
			// haven't found one to add to
			var newSection = new BushSection();
			newSection.add(row);

			this.sections.push(newSection);
			}
		},

		loopSections : function(){


		},

		mapHeights : function(){

		}
};