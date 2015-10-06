function Bush(data){
	this.startTiles = [64, 80];
	this.endTiles = [65, 81];

	this.tiles = data;	

	this.sections = [];
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

  	add : function(row){
	    var len = this.sections.length;
	    if(len===0){
			var newSection = new Section();
			newSection.add(row);

			this.sections.push(newSection);
	    } else {
	     	// check all sections to see if we can add to them
			for(var i = 0; i < len; i++){

				var section = this.sections[i];

				if(section.canAdd(row)) {
				  section.add(row);
				  return;
				}
			}
			var newSection = new Section();
			newSection.add(row);

			this.sections.push(newSection);
   		}
   	},

   	mapHeights : function(){
   		debugger;
   	}
};