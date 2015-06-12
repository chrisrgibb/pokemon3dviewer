function Building(config){
  this.startTiles = [15, 76, 78, 90,92 ];
  this.endTiles = [31, 77, 79, 90, 93];

  // this.startCharacters =

  this.sections = [];
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
    this.computedHeights = [];

    this.sections.forEach(function(section, index){

      var height = section.rows.length,
          topleftcorner = section.rows[0].data[0];
      if(height > 1 && topleftcorner===76){
        // start of building = x and y - roofsize ( 4 ) which is the top left corner
        // height will be height - roofsize
        var roofsize = 4,
            buildingHeight = height - roofsize;
        var buildingX = section.rows[0].x,
            buildingY = section.rows[0].y + roofsize;

        var collectHeights = [];

        for(var i = height-1; i >= buildingHeight; i--){
          var rw = section.rows[i];

          rw.height = height - i; // height of row

          var translatedRow = this.translateRow(rw);

          collectHeights.push(translatedRow);
          

        }
        this.computedHeights.push(collectHeights);

      }
    }, this);

    return this.computedHeights;
  },
  
  /*
   * gets a row of tile numbers that form a building and converts that data into its 
   * 3d representation
   */
  translateRow : function(row){ 

    var mapTiles = function(tileIndex, index, array){
      var row = this;
      // debugger;
      var translated = {
        x : row.x + index,
        y : row.y,
        height : row.height,
        texture : tileIndex
      }

      return translated;
    }


    return row.data.map(mapTiles, row); // pass row in as scope

  }
}

function Section(){
  this.rows = [];
  this.size = 0;
  this.translated = {};

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
