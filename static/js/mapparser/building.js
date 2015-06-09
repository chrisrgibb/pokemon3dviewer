function Building(config){
  this.startTiles = [15, 76, 78, 90,92 ];
  this.endTiles = [31, 77, 79, 90, 93];

  // this.startCharacters = 

  this.sections = [];
  this.sections2 = [];
  this.rows = [];
}



Building.prototype = {

  parse : function(){


  },

  match : function(currentTile, currentIndex){
    return this.startTiles.indexOf(currentTile) > -1;

  },

  isEnd : function(currentTile, nextTile){
    return this.endTiles.indexOf(currentTile) > -1 &&
           this.endTiles.indexOf(nextTile) === -1;

  },

  add : function(row){
    var len = this.sections2.length;
    if(len===0){
      var newSection = new Section();
      newSection.add(row);

      this.sections2.push(newSection);
    } else {
      // check all sections to see if we can add to them
      for(var i = 0; i < len; i++){
        var section = this.sections2[i];
        if(section.canAdd(row)){
          section.add(row);
          return;
        }
      }
      var newSection = new Section();
      newSection.add(row);

      this.sections2.push(newSection);
    }
  }
}

function Section(){
  this.rows = [];
  this.size = 0;

  this.canAdd = function(row){
    if(this.size === 0){
      return true;
    }
    var lastRow = this.rows[this.size-1];
    if(lastRow.x === row.x && lastRow.y+1 === row.y){
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
