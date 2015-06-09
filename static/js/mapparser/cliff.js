function Cliff(config){
  this.startTiles = [17, 55];
  this.endTiles = [36, 52];

  this.sections = [];
  this.rows = [];

}



Cliff.prototype = {

  parse : function(){
    debugger;
    x = 0, y = 5;



  },

  match : function(currentTile, currentIndex){
    return this.startTiles.indexOf(currentTile) > -1 && currentIndex === 0;

  },

  isEnd : function(currentTile, nextTile){
    return this.endTiles.indexOf(currentTile) > -1 &&
           this.endTiles.indexOf(nextTile) === -1;

  },


  add : function(row){
    this.sections.push(row);

  }

}
