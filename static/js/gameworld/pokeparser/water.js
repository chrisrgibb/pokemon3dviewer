function Water (argument) {
	// body...
}

Water.prototype = {
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
	}
};